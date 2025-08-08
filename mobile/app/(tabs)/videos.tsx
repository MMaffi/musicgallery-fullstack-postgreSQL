import { View, Text, StyleSheet } from 'react-native';

export default function Videos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vídeos</Text>
      <Text style={styles.subtitle}>
        Aqui você poderá assistir aos vídeos mais recentes do MusicGallery.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E1217', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFD300', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#FFFFFF', textAlign: 'center' },
});
