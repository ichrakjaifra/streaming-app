import WatchlistItem from './WatchlistItem';
import './WatchlistGrid.css';

const WatchlistGrid = ({ videos, onRemove }) => {
    return (
        <div className="watchlist-grid">
            {videos.map(video => (
                <WatchlistItem key={video.id} video={video} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default WatchlistGrid;
