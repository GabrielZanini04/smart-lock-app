import { MaterialCommunityIcons } from "@expo/vector-icons"; // Trazendo ícones incríveis do Expo
import * as SecureStore from "expo-secure-store";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  // Função para fazer logout e limpar o token salvo no celular
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      // Usamos replace em vez de navigate para o usuário não conseguir voltar pra Home usando o botão "voltar" do celular
      navigation.replace("Login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível desconectar.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Método de Abertura</Text>
        <Text style={styles.subtitle}>Como deseja abrir a porta hoje?</Text>
      </View>

      <View style={styles.grid}>
        {/* Botão do NFC */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Nfc")}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="nfc-variant"
            size={56}
            color="#2563eb"
          />
          <Text style={styles.cardTitle}>Aproximar NFC</Text>
        </TouchableOpacity>

        {/* Botão do Reconhecimento Facial */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Facial")}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="face-recognition"
            size={56}
            color="#2563eb"
          />
          <Text style={styles.cardTitle}>Reconhecimento Facial</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair do Aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // Sombras para dar um efeito de profundidade legal
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 56,
    alignItems: "center",
    padding: 16,
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});
