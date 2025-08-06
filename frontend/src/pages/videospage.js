import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import VideoList from '../components/videoList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function VideosPage({ videos, openPlayer }) {
  const query = useQuery();
  const searchTerm = query.get('q')?.trim() || '';

  // Configuração do Fuse
  const fuse = useMemo(() => {
    return new Fuse(videos, {
      keys: ['title', 'description'],
      threshold: 0.3,
    });
  }, [videos]);

  // Resultado filtrado
  const filteredVideos = useMemo(() => {
    if (!searchTerm) return videos;
    return fuse.search(searchTerm).map(result => result.item);
  }, [searchTerm, fuse, videos]);

  return (
    <main>
      <section id="gallery" className="gallery">
        <VideoList videos={filteredVideos} openPlayer={openPlayer} />
      </section>
    </main>
  );
}

export default VideosPage;