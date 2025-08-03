// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('user');
    if(token) navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen pt-32 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Dark Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5,
            }}
          >
            <div 
              className={`w-32 h-32 border border-neutral-700/20 ${
                i % 2 === 0 ? 'rounded-full' : 'rounded-3xl rotate-12'
              }`}
            />
          </motion.div>
        ))}

        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-neutral-100">
            Code.
          </span>
          <span className="text-neutral-500"> Create. </span>
          <span className="text-neutral-100">
            Deploy.
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-neutral-300 mb-16 max-w-4xl mx-auto leading-relaxed text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A minimalist code editor designed for clarity and focus. 
          Build beautiful web experiences with our clean, distraction-free dark environment.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="/signup"
            className="btn-primary text-lg px-10 py-4 group"
          >
            Start Building
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          
          <Link 
            to="/login"
            className="btn-secondary text-lg px-10 py-4"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              title: "Live Preview",
              description: "See your changes instantly with real-time preview",
              icon: "⚡",
              accent: "accent-emerald"
            },
            {
              title: "Cloud Sync",
              description: "Access your projects anywhere, anytime",
              icon: "☁️",
              accent: "accent-blue"
            },
            {
              title: "Clean Interface",
              description: "Focus on code with our distraction-free design",
              icon: "✨",
              accent: "accent-purple"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="card-futuristic text-center group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-6 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-100">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium inline-block ${feature.accent}`}>
                Enhanced
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;