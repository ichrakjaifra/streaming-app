import { Link } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ video }) => {
    return (
        <Link to={`/video/${video.id}`} className="video-card">
            <div className="video-card-image-container">
                <img src={video.thumbnailUrl} alt={video.title} className="video-card-image" />
                <div className="video-card-overlay">
                    <span className="video-duration">{video.duration}</span>
                </div>
            </div>
            <div className="video-card-content">
                <h3 className="video-card-title">{video.title}</h3>
                <div className="video-card-meta">
                    <span className="video-year">{video.releaseYear}</span>
                    <span className="video-type">{video.type}</span>
                    <span className="video-rating">★ {video.rating}</span>
                </div>
                <p className="video-card-category">{video.category}</p>
            </div>
        </Link>
    );
};

export default VideoCard;
