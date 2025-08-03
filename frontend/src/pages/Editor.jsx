import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Editor = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => {
            setHtml(res.data.html || '');
            setCss(res.data.css || '');
            setJs(res.data.js || '');
            setProjectName(res.data.name || 'Untitled Project');
        });
    }, [id, user?.token]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put(`http://localhost:8080/api/projects/${id}`, {
                html, css, js
            }, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setLastSaved(new Date());
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'html', label: 'HTML', value: html, setter: setHtml, icon: '🏗️', color: 'text-orange-400' },
        { id: 'css', label: 'CSS', value: css, setter: setCss, icon: '🎨', color: 'text-blue-400' },
        { id: 'js', label: 'JavaScript', value: js, setter: setJs, icon: '⚡', color: 'text-yellow-400' }
    ];

    const srcDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [html, css, js]); 

    return (
        <div className="min-h-screen pt-28 flex flex-col">
            {/* Enhanced Header */}
            <div className="glass-card mx-6 mb-6 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300 flex items-center space-x-2 font-medium group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                            <span>Back to Dashboard</span>
                        </button>
                        <div className="divider"></div>
                        <h1 className="text-2xl font-semibold text-neutral-100">{projectName}</h1>
                        <div className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full border border-emerald-800/50">
                            Live
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        {lastSaved && (
                            <span className="text-sm text-neutral-500 font-medium">
                                Saved {lastSaved.toLocaleTimeString()}
                            </span>
                        )}
                        <motion.button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSaving ? (
                                <div className="flex items-center">
                                    <div className="loading-spinner mr-3" />
                                    Saving...
                                </div>
                            ) : (
                                <span className="flex items-center">
                                    <span>💾</span>
                                    <span className="ml-2">Save Project</span>
                                </span>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Enhanced Editor Layout */}
            <div className="flex-1 flex mx-6 mb-6 gap-6">
                {/* Code Editor Panel */}
                <div className="w-1/2 glass-card overflow-hidden">
                    <div className="flex bg-neutral-800 border-b border-neutral-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`editor-tab flex-1 ${
                                    activeTab === tab.id ? 'active' : ''
                                }`}
                            >
                                <span className={`mr-2 text-base ${tab.color}`}>{tab.icon}</span>
                                <span className={activeTab === tab.id ? tab.color : ''}>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="h-full bg-neutral-900">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`${activeTab === tab.id ? 'block' : 'hidden'} h-full`}
                            >
                                <textarea
                                    value={tab.value}
                                    onChange={(e) => tab.setter(e.target.value)}
                                    className="w-full h-full resize-none bg-neutral-900 text-neutral-100 font-mono p-6 focus:outline-none border-none"
                                    placeholder={`Enter your ${tab.label.toLowerCase()} code here...`}
                                    style={{
                                        minHeight: 'calc(100vh - 280px)',
                                        fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        tabSize: 2
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Preview Panel */}
                <div className="w-1/2 glass-card overflow-hidden">
                    <div className="preview-header">
                        <div className="flex items-center space-x-3">
                            <span className="text-neutral-300 font-medium">Live Preview</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="preview-controls">
                            <div className="preview-control red"></div>
                            <div className="preview-control yellow"></div>
                            <div className="preview-control green"></div>
                        </div>
                    </div>
                    
                    <iframe
                        className="w-full bg-white"
                        title="Live Preview"
                        sandbox="allow-scripts allow-forms allow-popups allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin"
                        srcDoc={srcDoc}
                        style={{
                            height: 'calc(100vh - 280px)',
                            border: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Editor;