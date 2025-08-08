import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { useRouter } from 'expo-router';

export default function Settings() {
  const [lightmode, setLightmode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Configurações</Text>

      {/* Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-circle" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.item}>
          <Ionicons name="lock-closed" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Alterar Senha</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity> */}
      </View>

      {/* Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>

        <View style={styles.item}>
          <Ionicons name="sunny" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Modo Claro</Text>
          <Switch
            value={lightmode}
            onValueChange={setLightmode}
            trackColor={{ false: '#555', true: '#FFD300' }}
            thumbColor={lightmode ? '#0E1217' : '#f4f3f4'}
          />
        </View>

        <View style={styles.item}>
          <Ionicons name="notifications" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Notificações</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#555', true: '#FFD300' }}
            thumbColor={notifications ? '#0E1217' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>

        <TouchableOpacity 
          style={styles.item} 
          onPress={() => router.push('../screens/about')}
        >
          <Ionicons name="information-circle" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Sobre o Music Gallery</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.item}>
          <Ionicons name="document-text" size={24} color="#FFD300" />
          <Text style={styles.itemText}>Versão do App</Text>
          <Text style={styles.version}>1.0.0</Text>
        </View>  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E1217', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#FFD300', marginBottom: 20, marginTop: 30 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  itemText: { flex: 1, marginLeft: 10, fontSize: 16, color: '#FFFFFF' },
  version: { fontSize: 14, color: '#CCCCCC' },
});