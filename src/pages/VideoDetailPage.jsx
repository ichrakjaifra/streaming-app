import { useParams } from 'react-router-dom';

const VideoDetailPage = () => {
    const { id } = useParams();

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Détails de la vidéo : {id}</h2>
        </div>
    );
};

export default VideoDetailPage;
