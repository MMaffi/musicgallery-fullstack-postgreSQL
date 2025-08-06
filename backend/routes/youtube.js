const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

router.get('/', async (req, res) => {
  try {
    // Primeiro: buscar os vídeos
    const searchResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          part: 'snippet',
          order: 'date',
          maxResults: 10,
          type: 'video'
        }
      }
    );

    const videoItems = searchResponse.data.items;
    const videoIds = videoItems.map(item => item.id.videoId).join(',');


    const statsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          key: API_KEY,
          id: videoIds,
          part: 'statistics'
        }
      }
    );

    const statsMap = {};
    statsResponse.data.items.forEach(video => {
      statsMap[video.id] = video.statistics.viewCount;
    });

    const videos = videoItems.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail_url: item.snippet.thumbnails.high.url,
      video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
      views: statsMap[item.id.videoId] || 0
    }));

    res.json(videos);
  } catch (err) {
    console.error('Erro ao buscar vídeos do YouTube:', err.message);
    res.status(500).json({ error: 'Erro ao buscar vídeos do YouTube' });
  }
});

module.exports = router;