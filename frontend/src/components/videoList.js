import React from 'react';
import '../styles/style.css';
import { useTranslation } from 'react-i18next';

function VideoList({ videos, openPlayer }) {
  const { t } = useTranslation();

  if (!videos || videos.length === 0) return <p>{t('videos.not_found')}</p>;

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-card" onClick={() => openPlayer(video)}>
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="video-thumb"
            onError={e => { e.target.src = '/assets/images/no-image.png'; }}
          />
          <div className="video-info">
            <h4>{video.title}</h4>
            <span>{t('videos.views', { count: video.views })}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;