import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../context/AuthContext';

export function useWatchlist() {
    const { currentUser } = useAuth();
    const [watchlist, setWatchlist] = useLocalStorage('streaming_watchlist', []);

    const userWatchlist = currentUser
        ? watchlist.filter(item => item.userId === currentUser.id)
        : [];

    const addToWatchlist = (video) => {
        if (!currentUser) return false;

        const exists = watchlist.find(item => item.userId === currentUser.id && item.videoId === video.id);
        if (!exists) {
            const newItem = {
                id: Date.now().toString(),
                userId: currentUser.id,
                videoId: video.id,
                addedAt: new Date().toISOString()
            };
            setWatchlist([...watchlist, newItem]);
            return true;
        }
        return false;
    };

    const removeFromWatchlist = (videoId) => {
        if (!currentUser) return false;
        setWatchlist(watchlist.filter(item => !(item.userId === currentUser.id && item.videoId === videoId)));
        return true;
    };

    const isInWatchlist = (videoId) => {
        if (!currentUser) return false;
        return watchlist.some(item => item.userId === currentUser.id && item.videoId === videoId);
    };

    return {
        userWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
    };
}
