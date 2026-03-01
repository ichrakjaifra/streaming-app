import { CATEGORIES } from '../../data/mockVideos';
import './FilterSidebar.css';

const FilterSidebar = ({ activeType, setActiveType, activeCategory, setActiveCategory }) => {
    const types = ['TOUS', 'FILM', 'SERIE', 'DOCUMENTAIRE'];

    return (
        <aside className="filter-sidebar">
            <div className="filter-group">
                <h3 className="filter-title">Type de contenu</h3>
                <div className="filter-options">
                    {types.map(type => (
                        <button
                            key={type}
                            className={`filter-btn ${activeType === type ? 'active' : ''}`}
                            onClick={() => setActiveType(type)}
                        >
                            {type === 'TOUS' ? 'Tous les types' : type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <h3 className="filter-title">Catégories</h3>
                <div className="filter-options">
                    <button
                        className={`filter-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('ALL')}
                    >
                        Toutes
                    </button>
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeCategory === category.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
