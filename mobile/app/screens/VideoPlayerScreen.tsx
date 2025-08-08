import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoPlayerScreen() {
  const { id, title, views } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const onFullScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  };

  return (
    <View style={styles.container}>
      <YoutubeIframe
        videoId={String(id)}
        height={250}
        onFullScreenChange={onFullScreenChange}
      />

      <Text style={styles.title}>{title}</Text>
      {views && <Text style={styles.views}>{views} views</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    paddingTop: 55,
    paddingHorizontal: 12,
  },
  title: {
    color: "#FFD300",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  views: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
});