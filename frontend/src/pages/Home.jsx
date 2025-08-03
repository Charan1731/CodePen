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
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${25 + i * 25}%`,
              top: `${15 + i * 25}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <div 
              className={`w-24 h-24 border border-neutral-200/20 ${
                i % 2 === 0 ? 'rounded-full' : 'rounded-2xl rotate-12'
              }`}
            />
          </motion.div>
        ))}

        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
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
          <span className="text-neutral-900">
            Code.
          </span>
          <span className="text-neutral-500"> Create. </span>
          <span className="text-neutral-900">
            Deploy.
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-neutral-600 mb-16 max-w-3xl mx-auto leading-relaxed text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A minimalist code editor designed for clarity and focus. 
          Build beautiful web experiences with our clean, distraction-free environment.
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
              icon: "⚡"
            },
            {
              title: "Cloud Sync",
              description: "Access your projects anywhere, anytime",
              icon: "☁️"
            },
            {
              title: "Clean Interface",
              description: "Focus on code with our distraction-free design",
              icon: "✨"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="card-futuristic text-center group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-6 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;