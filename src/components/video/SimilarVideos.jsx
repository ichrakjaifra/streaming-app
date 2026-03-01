import VideoCard from '../common/VideoCard';
import './SimilarVideos.css';

const SimilarVideos = ({ currentVideo, allVideos }) => {
    const similar = allVideos
        .filter(v => v.id !== currentVideo.id && (v.category === currentVideo.category || v.type === currentVideo.type))
        .slice(0, 4);

    if (similar.length === 0) return null;

    return (
        <div className="similar-videos-container">
            <h3>Contenus similaires</h3>
            <div className="similar-videos-grid">
                {similar.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default SimilarVideos;
