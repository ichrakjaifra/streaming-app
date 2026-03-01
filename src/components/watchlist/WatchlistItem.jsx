import { Link } from 'react-router-dom';
import './WatchlistItem.css';

const WatchlistItem = ({ video, onRemove }) => {
    return (
        <div className="watchlist-item">
            <Link to={`/video/${video.id}`} className="watchlist-item-image">
                <img src={video.thumbnailUrl} alt={video.title} />
            </Link>
            <div className="watchlist-item-info">
                <h4 className="watchlist-item-title">{video.title}</h4>
                <p className="watchlist-item-meta">{video.releaseYear} • {video.category}</p>
                <button
                    className="remove-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove(video.id);
                    }}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default WatchlistItem;
