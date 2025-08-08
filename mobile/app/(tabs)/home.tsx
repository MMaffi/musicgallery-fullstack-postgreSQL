import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const API_URL = process.env.API_URL;

const mockVideos = [
  {
    id: 'F8yG_Pe9y6o',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/F8yG_Pe9y6o/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=F8yG_Pe9y6o',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 678
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 234
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 12
  },
  {
    id: 'zOIND7DFRg4',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/zOIND7DFRg4/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=zOIND7DFRg4',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 234
  },
  {
    id: '814SoGI3Nus',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/814SoGI3Nus/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=814SoGI3Nus',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 756
  }
];

type Video = {
  id: string;
  title: string;
  thumbnail_url: string;
  views: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const res = await fetch(`${API_URL}/api/youtube`);
        // const data: Video[] = await res.json();

        const data: Video[] = mockVideos; // Modo dev

        if (Array.isArray(data) && data.length > 0) {
          // Destaque aleatório
          const randomFeatured = data[Math.floor(Math.random() * data.length)];
          setFeaturedVideo(randomFeatured);
          setVideos(data);
        }
      } catch (err) {
        console.error("Erro ao buscar vídeos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getFullThumbUrl = (thumb: string) => {
    if (thumb.startsWith("http")) return thumb;
    return `${API_URL}${thumb}`;
  };

  const renderVideo = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() =>
        router.push({
          pathname: "../screens/VideoPlayerScreen",
          params: { id: item.id, title: item.title, views: item.views },
        })
      }
    >
      <Image
        source={{ uri: getFullThumbUrl(item.thumbnail_url) }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoViews}>{item.views.toLocaleString()} views</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD300" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {featuredVideo && (
        <TouchableOpacity
          style={styles.featuredContainer}
          onPress={() =>
            router.push({
              pathname: "../screens/VideoPlayerScreen",
              params: {
                id: featuredVideo.id,
                title: featuredVideo.title,
                views: featuredVideo.views,
              },
            })
          }
        >
          <Image
            source={{ uri: getFullThumbUrl(featuredVideo.thumbnail_url) }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>{featuredVideo.title}</Text>
            <Text style={styles.featuredViews}>
              {featuredVideo.views.toLocaleString()} views
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <Text style={styles.rescenttext}>Videos Rescentes</Text>

      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    marginTop: 55,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  featuredContainer: {
    margin: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD300",
  },
  featuredImage: {
    width: "100%",
    height: 200,
  },
  featuredTextContainer: {
    padding: 10,
    backgroundColor: "#1a1a1a",
  },
  featuredTitle: {
    color: "#FFD300",
    fontSize: 18,
    fontWeight: "bold",
  },
  featuredViews: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
  rescenttext: {
    paddingLeft: 15,
    color: "#fff",
    fontSize: 18,
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  videoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    padding: 5,
  },
  thumbnail: {
    width: 120,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  videoTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 10,
  },
  videoViews: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 10,
  },
});
