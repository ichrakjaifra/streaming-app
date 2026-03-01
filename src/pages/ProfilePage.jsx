import { useAuth } from '../context/AuthContext';
import { useWatchHistory } from '../hooks/useWatchHistory';
import UserInfo from '../components/profile/UserInfo';
import Stats from '../components/profile/Stats';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const { userHistory } = useWatchHistory();

    // Sort history by date descending
    const sortedHistory = [...userHistory].sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));

    return (
        <div className="profile-page-container">
            <UserInfo user={currentUser} />

            <Stats history={userHistory} />

            <div className="activity-section">
                <h3>Activité Récente</h3>
                <div className="activity-list">
                    {sortedHistory.length > 0 ? (
                        sortedHistory.map(item => (
                            <div key={item.id} className="activity-item">
                                <div className="activity-info">
                                    <Link to={`/video/${item.videoId}`} className="activity-title">
                                        {item.title}
                                    </Link>
                                    <span className="activity-date">
                                        {new Date(item.watchedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="activity-progress">
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar-fill" style={{ width: `${item.progressTime}%` }}></div>
                                    </div>
                                    <span className="progress-text">{item.completed ? 'Terminé' : `${item.progressTime}%`}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-activity">Aucune activité récente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
