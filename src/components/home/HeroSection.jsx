import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ featuredVideo }) => {
    if (!featuredVideo) return null;

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
                    <button className="hero-button hero-button-secondary">
                        + Ma Liste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
