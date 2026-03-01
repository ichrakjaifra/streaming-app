import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '6rem', color: '#e50914', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Oups ! Cette page n'existe pas.</h2>
            <Link to="/" style={{
                padding: '1rem 2rem',
                backgroundColor: '#e50914',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
            }}>
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;
