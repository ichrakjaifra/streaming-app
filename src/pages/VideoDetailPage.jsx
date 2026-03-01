import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { mockVideos } from '../data/mockVideos';
import VideoPlayer from '../components/video/VideoPlayer';
import VideoDetails from '../components/video/VideoDetails';
import SimilarVideos from '../components/video/SimilarVideos';
import './VideoDetailPage.css';

const VideoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
                <span onClick={() => navigate('/')} className="back-link" style={{ cursor: 'pointer' }}>Retour à l'accueil</span>
            </div>
        );
    }

    return (
        <div className="video-page-container">
            <span onClick={() => navigate('/')} className="back-to-catalog" style={{ cursor: 'pointer' }}>← Retour au catalogue</span>

            <VideoPlayer videoId={video.trailerUrl} title={video.title} />

            <div className="video-content-layout">
                <VideoDetails video={video} />
                <SimilarVideos currentVideo={video} allVideos={mockVideos} />
            </div>
        </div>
    );
};

export default VideoDetailPage;
