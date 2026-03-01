import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './VideoDetails.css';

const VideoDetails = ({ video }) => {
    const { currentUser } = useAuth();
    const [isInWatchlist, setIsInWatchlist] = useState(false); // To be linked with watchlist hook later

    const handleWatchlistAction = () => {
        if (!currentUser) {
            toast.error('Vous devez être connecté pour utiliser la watchlist.');
            return;
        }
        // Toggle state - will integrate actual logic in US-004
        setIsInWatchlist(!isInWatchlist);
        if (!isInWatchlist) {
            toast.success(`${video.title} ajouté à Ma Liste`);
        } else {
            toast.info(`${video.title} retiré de Ma Liste`);
        }
    };

    const handleRateAction = () => {
        if (!currentUser) {
            toast.error('Vous devez être connecté pour noter une vidéo.');
            return;
        }
        toast.success(`Vous avez noté ${video.title}`);
    };

    if (!video) return null;

    return (
        <div className="video-details-container">
            <div className="video-header">
                <h1 className="video-title">{video.title}</h1>
                <div className="video-meta">
                    <span className="meta-year">{video.releaseYear}</span>
                    <span className="meta-type">{video.type}</span>
                    <span className="meta-duration">{video.duration}</span>
                    <span className="meta-rating">★ {video.rating}</span>
                </div>
            </div>

            <div className="video-actions">
                <button
                    className={`action-btn ${isInWatchlist ? 'action-btn-active' : ''}`}
                    onClick={handleWatchlistAction}
                >
                    {isInWatchlist ? '✓ Dans Ma Liste' : '+ Ajouter à Ma Liste'}
                </button>
                <button className="action-btn" onClick={handleRateAction}>
                    ⭐ Noter
                </button>
            </div>

            <div className="video-info-grid">
                <div className="video-description">
                    <h3>Synopsis</h3>
                    <p>{video.description}</p>
                </div>

                <div className="video-credits">
                    <div className="credit-item">
                        <span className="credit-label">Réalisateur :</span>
                        <span className="credit-value">{video.director}</span>
                    </div>
                    <div className="credit-item">
                        <span className="credit-label">Casting :</span>
                        <span className="credit-value">{video.cast.join(', ')}</span>
                    </div>
                    <div className="credit-item">
                        <span className="credit-label">Catégorie :</span>
                        <span className="credit-value">{video.category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;
