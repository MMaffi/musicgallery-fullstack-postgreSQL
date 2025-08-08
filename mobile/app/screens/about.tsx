import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Music Gallery</Text>
      <Text style={styles.description}>
        Olá! Eu sou Mateus Maffi, músico apaixonado e criador do Music Gallery. Esse espaço nasceu com o objetivo de compartilhar minha jornada musical por meio de covers de músicas nacionais e internacionais, interpretadas com muito sentimento e dedicação.
      </Text>
      <Text style={styles.description}>
        Desde muito cedo, a música faz parte da minha vida. Ao longo dos anos, aprendi a tocar e desenvolver minha voz, buscando sempre transmitir a essência de cada canção. Cada vídeo aqui representa um pouco da minha identidade artística e do que acredito na música: emoção, autenticidade e conexão.
      </Text>
      <Text style={styles.description}>
        No Music Gallery você encontrará covers de diversos gêneros — do sertanejo ao MPB, do pop ao rock — todos gravados com carinho, criatividade e atenção aos detalhes.
      </Text>
      <Text style={styles.description}>
        Sinta-se à vontade para explorar os vídeos, deixar sugestões, me acompanhar nas redes sociais e, claro, compartilhar com amigos! Este projeto é feito com amor e está em constante evolução.
      </Text>
      <Text style={styles.descriptionEnd}>
        Obrigado por fazer parte disso. 🎵
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E1217', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#FFD300', marginBottom: 15 },
  description: { fontSize: 20, color: '#FFFFFF', textAlign: 'justify', marginBottom: 25 },
  descriptionEnd: { fontSize: 20, color: '#FFFFFF', textAlign: 'center', marginBottom: 25 },
});