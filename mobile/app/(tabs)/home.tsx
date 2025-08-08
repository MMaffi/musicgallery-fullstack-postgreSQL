import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MusicGallery</Text>
      <Text style={styles.subtitle}>
        Explore vídeos, envie sugestões e muito mais!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E1217', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFD300', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#FFFFFF', textAlign: 'center' },
});