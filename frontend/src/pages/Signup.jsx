import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const res = await axios.post('http://localhost:8080/api/signup', { email, username, password });
            login(res.data);
        } catch (error) {
            setError('Email already in use or invalid information. Please try again.');
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center px-6">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 right-40 w-36 h-36 bg-neutral-200/25 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-40 left-40 w-28 h-28 bg-neutral-100/35 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
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
                                Join CodeLab
                            </h2>
                            <p className="text-neutral-600">Create your account and start building</p>
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
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className="input-futuristic w-full focus-ring"
                                required
                            />
                        </div>

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
                                placeholder="Create a password"
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
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
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
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-neutral-900 hover:text-neutral-700 font-medium transition-colors duration-300 underline underline-offset-4"
                            >
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;