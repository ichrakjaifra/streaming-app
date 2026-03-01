import YouTube from 'react-youtube';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, title }) => {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <div className="video-player-container">
            <div className="video-player-wrapper">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    className="youtube-iframe"
                    title={`Trailer de ${title}`}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
