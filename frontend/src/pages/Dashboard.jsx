import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/projects', {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => setProjects(res.data));
    }, [user?.token]);

    const handleCreate = async () => {
        if (!newProjectName.trim()) return;
        
        setIsCreating(true);
        try {
            const res = await axios.post('http://localhost:8080/api/projects', {
                name: newProjectName,
            }, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            navigate(`/editor/${res.data._id}`);
        } catch (error) {
            console.error('Failed to create project:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen pt-32 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 text-balance">
                        Your Projects
                    </h1>
                    <p className="text-neutral-600 text-xl leading-relaxed">
                        Create, edit, and manage your code projects
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card p-8 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h3 className="text-2xl font-semibold mb-6 text-neutral-900">Create New Project</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={e => setNewProjectName(e.target.value)}
                            placeholder="Enter project name..."
                            className="input-futuristic flex-1 focus-ring"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                        />
                        <motion.button
                            onClick={handleCreate}
                            disabled={!newProjectName.trim() || isCreating}
                            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isCreating ? (
                                <div className="flex items-center">
                                    <div className="loading-spinner mr-3" />
                                    Creating...
                                </div>
                            ) : (
                                <span className="flex items-center">
                                    <span>Create Project</span>
                                    <span className="ml-2 text-lg">+</span>
                                </span>
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {projects.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                className="card-futuristic group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 * index }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate(`/editor/${project._id}`)}
                            >
                                <div className="w-14 h-14 bg-neutral-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-neutral-300 transition-colors duration-300">
                                    <span className="text-neutral-700 text-xl font-bold">
                                        {project.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                                    {project.name}
                                </h3>
                                
                                <div className="text-neutral-500 text-sm mb-6">
                                    {project.updatedAt ? (
                                        <span>Updated {formatDate(project.updatedAt)}</span>
                                    ) : (
                                        <span>New project</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['HTML', 'CSS', 'JS'].map((tech) => (
                                        <span 
                                            key={tech}
                                            className="px-3 py-1 bg-neutral-100 text-xs rounded-lg text-neutral-600 font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200">
                                    <span className="text-neutral-500 text-sm font-medium">Click to edit</span>
                                    <div className="w-6 h-6 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300 group-hover:translate-x-1">
                                        →
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="empty-state-icon">
                            <span className="text-2xl opacity-60">📝</span>
                        </div>
                        <h3 className="empty-state-title">No projects yet</h3>
                        <p className="empty-state-description">
                            Create your first project to start building amazing things with HTML, CSS, and JavaScript.
                        </p>
                        <button
                            onClick={() => document.querySelector('input').focus()}
                            className="btn-primary"
                        >
                            Create Your First Project
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;