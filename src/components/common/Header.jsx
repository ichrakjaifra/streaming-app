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
                <div onClick={() => navigate('/')} className="header-logo" style={{ cursor: 'pointer' }}>
                    🎬 <span>StreamApp</span>
                </div>

                <nav className="header-nav">
                    <span onClick={() => navigate('/')} className="nav-link">Accueil</span>
                    <span onClick={() => navigate('/watchlist')} className="nav-link">Ma Liste</span>
                    <span onClick={() => navigate('/profile')} className="nav-link">Mon Profil</span>
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
