import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { mockVideos } from '../data/mockVideos';
import VideoPlayer from '../components/video/VideoPlayer';
import VideoDetails from '../components/video/VideoDetails';
import SimilarVideos from '../components/video/SimilarVideos';
import './VideoDetailPage.css';

const VideoDetailPage = () => {
    const { id } = useParams();

    const video = useMemo(() => {
        return mockVideos.find(v => v.id === id);
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!video) {
        return (
            <div className="video-not-found">
                <h2>Vidéo non trouvée</h2>
                <Link to="/" className="back-link">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="video-page-container">
            <Link to="/" className="back-to-catalog">← Retour au catalogue</Link>

            <VideoPlayer videoId={video.trailerUrl} title={video.title} />

            <div className="video-content-layout">
                <VideoDetails video={video} />
                <SimilarVideos currentVideo={video} allVideos={mockVideos} />
            </div>
        </div>
    );
};

export default VideoDetailPage;
