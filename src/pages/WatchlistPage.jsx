import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist';
import { mockVideos } from '../data/mockVideos';
import WatchlistGrid from '../components/watchlist/WatchlistGrid';
import { toast } from 'react-toastify';
import './WatchlistPage.css';

const WatchlistPage = () => {
    const { userWatchlist, removeFromWatchlist } = useWatchlist();

    const watchlistVideos = useMemo(() => {
        return userWatchlist.map(item => mockVideos.find(v => v.id === item.videoId)).filter(Boolean);
    }, [userWatchlist]);

    const handleRemove = (videoId) => {
        removeFromWatchlist(videoId);
        toast.info('Vidéo retirée de votre liste');
    };

    return (
        <div className="watchlist-page-container">
            <header className="watchlist-header">
                <h1>Ma Liste</h1>
                <Link to="/" className="back-link">Continuer à explorer</Link>
            </header>

            {watchlistVideos.length > 0 ? (
                <WatchlistGrid videos={watchlistVideos} onRemove={handleRemove} />
            ) : (
                <div className="empty-watchlist">
                    <p>Votre liste est vide pour le moment.</p>
                    <Link to="/" className="explore-btn">Découvrir des contenus</Link>
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
