import { Link, useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, TextInput, Modal, ScrollView, Animated, Easing } from "react-native";

export default function ChatDesabafoAnon() {
  const router = useRouter()
  const { nome } = useLocalSearchParams();
  const [tempoRestante, setTempoRestante] = useState(30 * 60);
  const [acelerar, setAcelerar] = useState(false);
  const [popupTempo, setPopupTempo] = useState(false);
  const [popupFinalizar, setPopupFinalizar] = useState(false);

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
      <View className="w-full h-16 flex-row gap-4 items-center justify-center">
          <TouchableOpacity
          className="bg-[#F4A896] w-32 h-14 items-center justify-center"
          style={{borderRadius: 30}}>
            <Text className="text-[#2E4A62] font-serif font-bold text-center text-base leading-tight">Reportar Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity
          className="bg-[#F4A896] w-32 h-14 items-center justify-center"
          style={{borderRadius: 30}}
          onPress={() => setPopupFinalizar(true)}>
            <Text className="text-[#2E4A62] font-serif font-bold text-center text-base leading-tight">Finalizar{'\n'}Chat</Text>
          </TouchableOpacity>
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

      {/* Pop-up para finalizar */}
      <Modal
      visible={popupFinalizar}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPopupFinalizar(false)}>
        <View className="flex-1 bg-[#00000085] items-center">
          <View className="bg-[#ffffffdc] mt-28 px-6 py-5 w-5/6 h-auto flex-col gap-4"
           style={{ borderRadius: 30}}>
            <Text className="text-[#2E4A62] font-serif text-xl font-bold text-center">Tem certeza que deseja encerrar essa conversa?</Text>
            <View className="w-full flex-row gap-3">
                <TouchableOpacity className="bg-[#2E4A62] w-14">
                    <Text>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Não</Text>
                </TouchableOpacity>
            </View>
           </View>
        </View>
      </Modal>


    </View>
  );
}