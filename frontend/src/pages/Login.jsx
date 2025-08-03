import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const res = await axios.post('http://localhost:8080/api/login', { email, password });
            login(res.data);
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center px-6">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-32 left-32 w-32 h-32 bg-neutral-200/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-32 right-32 w-40 h-40 bg-neutral-100/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="glass-card p-10">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                                Welcome Back
                            </h2>
                            <p className="text-neutral-600">Sign in to continue building</p>
                        </motion.div>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {error && (
                            <motion.div
                                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input-futuristic w-full focus-ring"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input-futuristic w-full focus-ring"
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="loading-spinner mr-3" />
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-neutral-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-neutral-900 hover:text-neutral-700 font-medium transition-colors duration-300 underline underline-offset-4"
                            >
                                Create one
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;