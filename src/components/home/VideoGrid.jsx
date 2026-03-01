import VideoCard from '../common/VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ videos }) => {
    if (videos.length === 0) {
        return (
            <div className="video-grid-empty">
                <p>Aucune vidéo ne correspond à vos critères.</p>
            </div>
        );
    }

    return (
        <div className="video-grid">
            {videos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
