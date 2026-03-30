import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

// Pré-inicia o gerenciador NFC
NfcManager.start();

export default function NfcScreen({ navigation }) {
  const [hasNfc, setHasNfc] = useState(null);

  useEffect(() => {
    const checkNfc = async () => {
      const supported = await NfcManager.isSupported();
      setHasNfc(supported);
    };
    checkNfc();

    // Event listener para quando ler uma tag
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log("Tag NFC Encontrada!", tag);

      NfcManager.unregisterTagEvent().catch(() => 0);
      navigation.goBack();
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, [navigation]);

  const lerTag = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn("Erro ao tentar ler NFC", ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  if (hasNfc === false) {
    return (
      <View style={styles.container}>
        <Text>Seu dispositivo não suporta NFC.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aproxime o celular da fechadura</Text>
      <TouchableOpacity style={styles.button} onPress={lerTag}>
        <Text style={styles.buttonText}>Iniciar Leitura NFC</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 40 },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  cancelButton: { marginTop: 20 },
  cancelText: { color: "#64748b" },
});
