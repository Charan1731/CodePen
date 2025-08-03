import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CodeLab = () => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-lg flex items-center justify-center shadow-lg">
      <div className="w-4 h-4 bg-neutral-900 rounded-sm flex items-center justify-center">
        <div className="w-2 h-2 bg-neutral-100 rounded-xs"></div>
      </div>
    </div>
    <span className="text-xl font-bold text-neutral-100 tracking-tight">CodeLab</span>
  </div>
);

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-6 left-6 right-6 z-50 glass-card px-6 py-4 mx-auto max-w-6xl animate-slide-up">
            <div className="flex justify-between items-center">
                <Link 
                    to='/' 
                    className="transition-all hover:scale-105 duration-300"
                >
                    <CodeLab/>
                </Link>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <div className="status-online">
                                <div className="status-dot"></div>
                                <span className="text-sm font-medium">{user.username}</span>
                            </div>
                            
                            <Link 
                                to='/dashboard' 
                                className="nav-link"
                            >
                                Dashboard
                            </Link>
                            
                            <button 
                                onClick={logout}
                                className="btn-danger"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to='/login' 
                                className="nav-link"
                            >
                                Sign In
                            </Link>
                            
                            <Link 
                                to='/signup' 
                                className="btn-primary"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;