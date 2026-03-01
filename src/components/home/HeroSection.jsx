import { Link } from 'react-router-dom';
import { useWatchlist } from '../../hooks/useWatchlist';
import { toast } from 'react-toastify';
import './HeroSection.css';

const HeroSection = ({ featuredVideo }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    if (!featuredVideo) return null;

    const handleWatchlist = () => {
        if (isInWatchlist(featuredVideo.id)) {
            removeFromWatchlist(featuredVideo.id);
            toast.info(`${featuredVideo.title} retiré de Ma Liste`);
        } else {
            addToWatchlist(featuredVideo);
            toast.success(`${featuredVideo.title} ajouté à Ma Liste`);
        }
    };

    const isAdded = isInWatchlist(featuredVideo.id);

    return (
        <div className="hero-section">
            <div className="hero-background">
                <img src={featuredVideo.thumbnailUrl} alt={featuredVideo.title} />
                <div className="hero-gradient"></div>
            </div>
            <div className="hero-content">
                <h1 className="hero-title">{featuredVideo.title}</h1>
                <div className="hero-meta">
                    <span className="hero-year">{featuredVideo.releaseYear}</span>
                    <span className="hero-type">{featuredVideo.type}</span>
                    <span className="hero-rating">★ {featuredVideo.rating}</span>
                </div>
                <p className="hero-description">{featuredVideo.description}</p>
                <div className="hero-actions">
                    <Link to={`/video/${featuredVideo.id}`} className="hero-button hero-button-primary">
                        ▶ Regarder le trailer
                    </Link>
                    <button
                        className={`hero-button hero-button-secondary ${isAdded ? 'added' : ''}`}
                        onClick={handleWatchlist}
                    >
                        {isAdded ? '✓ Dans Ma Liste' : '+ Ma Liste'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
