import { Link, useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, TextInput, Modal, ScrollView, FlatList, KeyboardAvoidingView, Platform } from "react-native";

type Mensagem = {
  id: string;
  texto: string;
  tipo: "usuario" | "ouvinte";
};

export default function ChatDesabafoAnon() {
  const router = useRouter()
  const { nome } = useLocalSearchParams();

  const [tempoRestante, setTempoRestante] = useState(30 * 60);
  const [acelerar, setAcelerar] = useState(false);

  const [popupTempo, setPopupTempo] = useState(false);
  const [popupFinalizar, setPopupFinalizar] = useState(false);
  const [popupReportar, setPopupReportar] = useState(false);
  const [popupCertezaReportar, setPopupCertezaReportar] = useState(false);
  const [popupReportado, setPopupReportado] = useState(false);

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [mensagemInput, setMensagemInput] = useState("");

  const enviarMensagem = () => {
    if (mensagemInput.trim() === "") return;

    const novaMensagem: Mensagem = {
      id: String(mensagens.length + 1),
      texto: mensagemInput,
      tipo: "usuario",
    };

    const novasMensagens = [...mensagens, novaMensagem];
    setMensagens(novasMensagens);
    setMensagemInput("");

    const mensagensUsuario = novasMensagens.filter((m) => m.tipo === "usuario");

    if (mensagensUsuario.length === 1) {
      // Primeira resposta automática após 8 segundos
      setTimeout(() => {
        setMensagens((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            texto: "Olá, posso ajudar?",
            tipo: "ouvinte",
          },
        ]);
      }, 8000);
    } else if (mensagensUsuario.length === 2) {
      // Segunda resposta automática após 20 segundos
      setTimeout(() => {
        setMensagens((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            texto: "Claro. Estou aqui para te escutar. Sinta-se à vontade de dizer qualquer coisa.",
            tipo: "ouvinte",
          },
        ]);
      }, 15000);
    }
  };

  useEffect(() => {
    if (tempoRestante <= 0) {
      setPopupTempo(true);
      return;
    }

    const intervalo = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1){
          clearInterval(intervalo);
          return 0;
        }

        const decremento = acelerar ? 100 : 1;
        return prev - decremento > 0 ? prev - decremento : 0
      });
    }, acelerar ? 50 : 1000);    ///a cada 1s

    return() => clearInterval(intervalo);
  }, [acelerar, tempoRestante]);

  const formatarTempo = (segundos:number) => {
    const minutos = Math.floor(segundos/60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 items-center bg-[#9DC8C8] w-full">
      {/* Barra superior  */}
      <View className="w-full h-20 bg-[#2E4A62] flex-row  items-center justify-between px-2"
        style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 15,
          }}>
            <Text className="text-[#F4A896] text-2xl font-serif font-bold">{nome}</Text>
            <TouchableOpacity 
              onPress={() => setAcelerar(true)}>
              <View className="items-center flex-col">   
                <Text className="text-[#F4A896] text-sm leading-tight font-serif font-bold">Temporizador</Text>
                <Text className="text-[#F4A896] text-2xl leading-tight font-serif font-bold text-center">{formatarTempo(tempoRestante)}</Text>
              </View>
            </TouchableOpacity>      
      </View>

      {/* Botões abaixo da barra */}
      <View className="w-full h-20 flex-row gap-4 items-center justify-center bg-[#9dc8c8bb]">
          <TouchableOpacity
          className="bg-[#e2aea0] w-32 h-14 items-center justify-center"
          style={{borderRadius: 30}}
          onPress={() => setPopupReportar(true)}>
            <Text className="text-[#2E4A62] font-serif text-center text-lg leading-tight">Reportar Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity
          className="bg-[#e2aea0] w-32 h-14 items-center justify-center"
          style={{borderRadius: 30}}
          onPress={() => setPopupFinalizar(true)}>
            <Text className="text-[#2E4A62] font-serif text-center text-lg leading-tight">Finalizar{'\n'}Chat</Text>
          </TouchableOpacity>
      </View>

      {/* Corpo do chat */}
      <ScrollView 
        className="flex-1 w-full px-4 pt-2"
        contentContainerStyle={{ paddingBottom: 120 }}>
          {mensagens.map((m) => (
            <View key={m.id}
            className={`my-2 max-w-[75%] px-4 py-4  ${
              m.tipo === "usuario"
                ? "bg-[#8DAE95] self-end rounded-tl-3xl rounded-bl-3xl rounded-tr-xl rounded-br-xl pl-6"
                : "bg-[#FDF6EC] self-start rounded-tr-3xl rounded-br-3xl rounded-tl-xl rounded-bl-xl pr-6"
            }`}>
              <Text className="text-[#2E4A62] font-serif">{m.texto}</Text>
            </View>
          ))}
      </ScrollView>

      {/*  Mensagens */}
      <View className="absolute bottom-5 w-11/12 justify-center items-center">
        <View className="flex-row items-center w-full bg-[#2e4a62d2] h-16 px-4"
          style={{ borderRadius: 30}}>
          <TextInput
            className="flex-1 text-[#ffffff] font-serif"
            placeholderTextColor={"#ccc"}
            placeholder="Mensagem"
            value={mensagemInput}
            onChangeText={setMensagemInput}
            onSubmitEditing={enviarMensagem}
            returnKeyLabel="send"/>
          <TouchableOpacity
          onPress={enviarMensagem}>
            <Ionicons name="send" size={24} color={"#fdf6ecc9"}/>
          </TouchableOpacity>
        </View>
      </View>



      {/* Pop-up de quando o tempo esgotar */}
      <Modal visible={popupTempo} transparent animationType="fade">
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffdc] mt-28 px-6 py-5 w-5/6 h-auto gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold text-left">O tempo acabou!</Text>
            <View className="w-full flex-row justify-end gap-3">
              <TouchableOpacity className="w-20 py-2 bg-[#2E4A62]"
               style={{ borderRadius: 30}}
               onPress={() => {
                setTempoRestante(30 * 60);
                setPopupTempo(false);
                setAcelerar(false);
               }}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-xl leading-tight text-center">+ 30</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-20 py-2 bg-[#2E4A62]"
               style={{ borderRadius: 30}}
               onPress={() => {
                setPopupTempo(false);
                router.push('./avaliacao')}}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-xl leading-tight text-center">Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Popup para reportar */}
      <Modal
      visible={popupReportar}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPopupReportar(false)}>
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffc2] mt-28 px-6 py-5 w-5/6 h-auto flex-col gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-2xl text-[#2E4A62] font-serif font-bold text-center"> <Text className="text-xl">🛑</Text> Reportar Usuário</Text>
            <Text className="text-xl text-[#2E4A62] font-serif text-justify">Deseja denunciar comportamento inapropriado por parte do usuário?</Text>
            <View className="flex-row gap-5 justify-end">
              <TouchableOpacity
                className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => {
                  setPopupReportar(false);
                  setPopupCertezaReportar(true);
                  }}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => setPopupReportar(false)}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Popup para confirmar reportar */}
      <Modal
      visible={popupCertezaReportar}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPopupCertezaReportar(false)}>
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffc2] mt-28 px-6 py-5 w-5/6 h-auto flex-col gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-xl text-[#2E4A62] font-serif text-justify">Tem certeza que deseja Reportar Usuário?</Text>
            <View className="flex-row gap-5 justify-end">
              <TouchableOpacity
                className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => {
                  setPopupCertezaReportar(false);
                  setPopupReportado(true);
                  }}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => setPopupCertezaReportar(false)}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Popup para confirmar reportar */}
      <Modal
      visible={popupReportado}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPopupReportado(false)}>
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffc2] mt-28 px-6 py-5 w-5/6 h-auto flex-col gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-2xl text-[#2E4A62] font-serif font-bold text-center">Usuário Reportado</Text>
            <Text className="text-xl text-[#2E4A62] font-serif text-justify">Nossa equipe analisará o comportamento. Obrigado por ajudar a manter o ambiente seguro e respeitoso.</Text>
            <View className="flex-row gap-5 justify-end">
              <TouchableOpacity 
                className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => {
                  setPopupReportado(false)
                  router.push('/')
                  }}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pop-up para finalizar */}
      <Modal
      visible={popupFinalizar}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPopupFinalizar(false)}>
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffc2] mt-28 px-6 py-5 w-5/6 h-auto flex-col gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-[#2E4A62] font-serif text-xl font-bold text-left">Tem certeza que deseja encerrar essa conversa?</Text>
            <View className="w-full flex-row gap-4 justify-center">
                <TouchableOpacity className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => {
                  setPopupFinalizar(false);
                  router.push('/avaliacao');
                  }}>
                    <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#2E4A62] w-16 h-9 items-center justify-center"
                style={{ borderRadius: 30}}
                onPress={() => setPopupFinalizar(false)}>
                    <Text className="text-[#FDF6EC] font-serif font-bold text-lg leading-tight text-center">Não</Text>
                </TouchableOpacity>
            </View>
           </View>
        </View>
      </Modal>

      

    </View>
  );
}