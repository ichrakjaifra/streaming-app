import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('streaming_theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('streaming_theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('streaming_theme', 'light');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) return null;

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    🎬 <span>StreamApp</span>
                </Link>

                <nav className="header-nav">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/watchlist" className="nav-link">Ma Liste</Link>
                    <Link to="/profile" className="nav-link">Mon Profil</Link>
                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                    <div className="user-menu">
                        <span className="username">{currentUser?.username}</span>
                        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
