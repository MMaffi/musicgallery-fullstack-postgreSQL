import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Suggestions() {
  const [suggestion, setSuggestion] = useState('');

  const handleSend = () => {
    console.log('Sugestão enviada:', suggestion);
    setSuggestion('');
    alert('Sugestão enviada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Sugestão</Text>
      <Text style={styles.subtitle}>
        Compartilhe ideias, melhorias ou conteúdos que gostaria de ver no MusicGallery.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua sugestão..."
        placeholderTextColor="#CCCCCC"
        value={suggestion}
        onChangeText={setSuggestion}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0E1217' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFD300', textAlign: 'center', marginBottom: 8, marginTop: 30 },
  subtitle: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#FFD300',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFD300',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#0E1217', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});