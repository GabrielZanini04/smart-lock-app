import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FacialScreen({ navigation }) {
  // A nova API usa um Hook nativo para gerenciar permissões
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Carregando as permissões...
    return <View />;
  }

  if (!permission.granted) {
    // Permissão negada ou ainda não solicitada
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Precisamos da sua permissão para acessar a câmera e validar a
          biometria.
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  const tirarFoto = async () => {
    if (cameraRef.current) {
      // Captura a foto em base64 para facilitar o envio na requisição HTTP
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log("Foto capturada com sucesso!");

      // Aqui entrará o POST para a rota de validação facial no backend

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="front" // Novo padrão para definir a câmera frontal
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={tirarFoto}>
            <Text style={styles.text}> Validar Rosto </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  camera: { flex: 1, margin: -20 }, // Margem negativa para compensar o padding do container na câmera
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
    paddingBottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  text: { fontSize: 18, color: "white", fontWeight: "bold" },
});
