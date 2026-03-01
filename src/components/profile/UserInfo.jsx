import './UserInfo.css';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info-card">
            <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
                <h2>{user.username}</h2>
                <p className="user-email">{user.email}</p>
                <span className="user-badge">Membre Premium</span>
            </div>
        </div>
    );
};

export default UserInfo;
