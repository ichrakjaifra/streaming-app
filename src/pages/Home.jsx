import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockVideos } from '../data/mockVideos';
import HeroSection from '../components/home/HeroSection';
import FilterSidebar from '../components/home/FilterSidebar';
import VideoGrid from '../components/home/VideoGrid';
import SearchBar from '../components/common/SearchBar';
import './Home.css';

const Home = () => {
    const { logout, currentUser } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState('TOUS'); // 'TOUS', 'FILM', 'SERIE', 'DOCUMENTAIRE'
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState('recent'); // 'recent', 'rated', 'popular'

    const featuredVideo = useMemo(() => {
        return mockVideos[0] || null;
    }, []);

    const filteredAndSortedVideos = useMemo(() => {
        let result = [...mockVideos];

        // Filter by type
        if (activeType !== 'TOUS') {
            result = result.filter(v => v.type === activeType);
        }

        // Filter by category
        if (activeCategory !== 'ALL') {
            result = result.filter(v => v.category === activeCategory);
        }

        // Filter by search term
        if (searchTerm.trim() !== '') {
            result = result.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return b.releaseYear - a.releaseYear;
                case 'rated':
                    return b.rating - a.rating;
                case 'popular':
                    // Assuming higher rating implies popularity as we don't have view counts
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        return result;
    }, [activeType, activeCategory, searchTerm, sortBy]);

    return (
        <div className="page-container">
            <header className="home-header">
                <div className="home-header-left">
                    <h2>Plateforme Streaming</h2>
                </div>
                <div className="home-header-center">
                    <SearchBar onSearch={setSearchTerm} suggestions={mockVideos} />
                </div>
                <div className="home-header-right">
                    <span className="user-greeting">Salut, {currentUser?.username}</span>
                    <button onClick={logout} className="logout-button">Déconnexion</button>
                </div>
            </header>

            <main className="home-content">
                <HeroSection featuredVideo={featuredVideo} />

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
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
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
