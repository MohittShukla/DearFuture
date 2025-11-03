import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header-brand">
        <img src="/eye.png" alt="Eye icon" style={{ width: '40px', height: '40px', marginRight:'5px' }} />
        <h1 className="header-title">
          Dear Future
        </h1>
      </Link>

      <nav className="header-nav">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="header-link">
              My Messages
            </Link>
            <span className="header-user">Hello, {user?.name}</span>
            <button onClick={handleLogout} className="header-button logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-button login">
              Login
            </Link>
            <Link to="/signup" className="header-button signup">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
