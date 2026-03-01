import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWatchHistory } from '../hooks/useWatchHistory';
import { mockVideos } from '../data/mockVideos';
import HeroSection from '../components/home/HeroSection';
import FilterSidebar from '../components/home/FilterSidebar';
import VideoGrid from '../components/home/VideoGrid';
import SearchBar from '../components/common/SearchBar';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { currentUser } = useAuth();
    const { userHistory } = useWatchHistory();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState('TOUS');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState('recent');

    const featuredVideo = useMemo(() => {
        return mockVideos[1] || mockVideos[0]; // Interstellar as featured if available
    }, []);

    const continueWatching = useMemo(() => {
        return userHistory
            .filter(item => !item.completed)
            .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
            .slice(0, 4)
            .map(item => mockVideos.find(v => v.id === item.videoId))
            .filter(Boolean);
    }, [userHistory]);

    const filteredAndSortedVideos = useMemo(() => {
        let result = [...mockVideos];
        if (activeType !== 'TOUS') result = result.filter(v => v.type === activeType);
        if (activeCategory !== 'ALL') result = result.filter(v => v.category === activeCategory);
        if (searchTerm.trim() !== '') result = result.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));

        result.sort((a, b) => {
            if (sortBy === 'recent') return b.releaseYear - a.releaseYear;
            if (sortBy === 'rated' || sortBy === 'popular') return b.rating - a.rating;
            return 0;
        });
        return result;
    }, [activeType, activeCategory, searchTerm, sortBy]);

    return (
        <div className="page-container">
            <div className="home-search-section">
                <SearchBar onSearch={setSearchTerm} suggestions={mockVideos} />
            </div>

            <main className="home-content">
                <HeroSection featuredVideo={featuredVideo} />

                {continueWatching.length > 0 && !searchTerm && (
                    <section className="continue-watching">
                        <h3>À continuer</h3>
                        <div className="continue-grid">
                            {continueWatching.map(video => {
                                const historyItem = userHistory.find(h => h.videoId === video.id);
                                return (
                                    <Link key={video.id} to={`/video/${video.id}`} className="continue-card">
                                        <img src={video.thumbnailUrl} alt={video.title} />
                                        <div className="continue-info">
                                            <span className="continue-title">{video.title}</span>
                                            <div className="progress-bar-bg">
                                                <div className="progress-bar-fill" style={{ width: `${historyItem?.progressTime}%` }}></div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                <div className="catalog-section">
                    <FilterSidebar
                        activeType={activeType}
                        setActiveType={setActiveType}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />

                    <div className="catalog-main">
                        <div className="catalog-header">
                            <h3>Catalogue</h3>
                            <div className="sort-control">
                                <label htmlFor="sort">Trier par :</label>
                                <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                                    <option value="recent">Plus récents</option>
                                    <option value="rated">Mieux notés</option>
                                    <option value="popular">Popularité</option>
                                </select>
                            </div>
                        </div>
                        <VideoGrid videos={filteredAndSortedVideos} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
