import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 bg-paper/80 backdrop-blur-sm border-b border-ink/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={isAuthenticated ? "/compose" : "/"}
          className="flex items-center gap-2 font-serif text-2xl md:text-3xl text-ink font-normal tracking-wide hover:text-hope transition-colors duration-300"
        >
          <img src="/eye.png" alt="Eye icon" className="w-8 h-8 md:w-10 md:h-10 opacity-80" />
          Dear Future
        </Link>

        <nav className="flex items-center gap-6 md:gap-8 font-sans text-ink-secondary">
          {isAuthenticated ? (
            <>
              <Link
                to="/compose"
                className="text-sm md:text-base hover:text-ink transition-colors duration-300"
              >
                Compose
              </Link>
              <Link
                to="/dashboard"
                className="text-sm md:text-base hover:text-ink transition-colors duration-300"
              >
                My Messages
              </Link>
              <span className="hidden md:inline text-xs text-ink-secondary">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm md:text-base text-hope hover:text-ink transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm md:text-base hover:text-ink transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm md:text-base px-4 py-2 border border-hope rounded-full hover:bg-hope hover:text-paper transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
