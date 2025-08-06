import React from 'react';
import FeaturedVideo from '../components/FeaturedVideo';
import VideoList from '../components/videoList';
import { useTranslation } from 'react-i18next';

function Home({ videos, openPlayer, featured }) {
  const { t } = useTranslation();

  return (
    <main>
      <section id="featured">
        {featured && <FeaturedVideo video={featured} openPlayer={openPlayer} />}
      </section>
      <h3 className="gallery-subtitle" id="gallerySubtitle">
        {t('home.recent_videos')}
      </h3>
      <section id="gallery" className="gallery">
        <VideoList videos={videos} openPlayer={openPlayer} />
      </section>
    </main>
  );
}

export default Home;