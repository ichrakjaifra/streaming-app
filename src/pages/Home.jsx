import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { logout, currentUser } = useAuth();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Catalogue (Accueil)</h1>
            <p>Bienvenue, {currentUser?.username}!</p>
            <button onClick={logout} style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}>
                Se déconnecter
            </button>
        </div>
    );
};

export default Home;
