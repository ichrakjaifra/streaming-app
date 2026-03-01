import './Stats.css';

const Stats = ({ history }) => {
    const totalWatched = history.length;
    const completed = history.filter(h => h.completed).length;

    // Calculate favorite category
    const categoriesCount = history.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {});

    let favoriteCategory = 'N/A';
    let maxCount = 0;
    Object.entries(categoriesCount).forEach(([cat, count]) => {
        if (count > maxCount) {
            maxCount = count;
            favoriteCategory = cat;
        }
    });

    return (
        <div className="stats-container">
            <h3>Mes Statistiques</h3>
            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-value">{totalWatched}</span>
                    <span className="stat-label">Contenus vus</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{completed}</span>
                    <span className="stat-label">Terminés</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{favoriteCategory}</span>
                    <span className="stat-label">Genre préféré</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;
