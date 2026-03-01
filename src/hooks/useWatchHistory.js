import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../context/AuthContext';

export function useWatchHistory() {
    const { currentUser } = useAuth();
    const [history, setHistory] = useLocalStorage('streaming_history', []);

    const userHistory = currentUser
        ? history.filter(item => item.userId === currentUser.id)
        : [];

    const addToHistory = (video) => {
        if (!currentUser) return;

        const existingIndex = history.findIndex(item => item.userId === currentUser.id && item.videoId === video.id);
        const now = new Date().toISOString();

        if (existingIndex !== -1) {
            // Update existing entry
            const updatedHistory = [...history];
            updatedHistory[existingIndex] = {
                ...updatedHistory[existingIndex],
                watchedAt: now,
                progressTime: Math.min(updatedHistory[existingIndex].progressTime + 10, 100), // Simulate progress
                completed: (updatedHistory[existingIndex].progressTime + 10) >= 100
            };
            setHistory(updatedHistory);
        } else {
            // Add new entry
            const newItem = {
                id: Date.now().toString(),
                userId: currentUser.id,
                videoId: video.id,
                title: video.title, // Cache for profile stats
                category: video.category, // Cache for profile stats
                type: video.type, // Cache
                watchedAt: now,
                progressTime: 10,
                completed: false
            };
            setHistory([...history, newItem]);
        }
    };

    const markAsCompleted = (videoId) => {
        if (!currentUser) return;
        const updatedHistory = history.map(item => {
            if (item.userId === currentUser.id && item.videoId === videoId) {
                return { ...item, completed: true, progressTime: 100 };
            }
            return item;
        });
        setHistory(updatedHistory);
    };

    return {
        userHistory,
        addToHistory,
        markAsCompleted
    };
}
