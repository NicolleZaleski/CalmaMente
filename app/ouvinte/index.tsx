import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, Modal, ScrollView, Animated, Easing } from "react-native";

function IconeCarregando(){
  const rotaAnimada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotaAnimada, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotacao = rotaAnimada.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={{
        transform: [{ rotate: rotacao}], 
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        }}>
      <EvilIcons name="spinner-3" size={25} color={"#2E4A62"}/>
    </Animated.View>
  );
}


export default function Ouvinte() {
  const router = useRouter();
  const [habilitado, setHabilitado] = useState(true);
  const [popupNotificacao, setPopupNotificacao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [recusados, setRecusados] = useState(0);
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const { apelido } = useLocalSearchParams();
  const temDenuncia = apelido === "vampiravintage";

  useEffect(() => {
    if (popupNotificacao) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [popupNotificacao]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(true);

      setPopup1(true);

      const popup2Timer = setTimeout(() => {
        setPopup2(true);
      }, 2000);

      

      return () => clearTimeout(popup2Timer);

    }, 5000);
    
    const popup3Timer = setTimeout(() => {
        setPopup3(true);
      }, 15000)

    return () => {clearTimeout(timer);
                  clearTimeout(popup3Timer);};
  }, []);

  return (
    <View className="flex-1 items-center bg-[#9DC8C8] w-full">
      {/* barra superior */}
      <View className="w-full h-20 bg-[#355C4B] flex-row"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 15,
      }}>
        <TouchableOpacity
         onPress={() => router.push('/')}>
          <Text className="bottom-0 absolute pl-1">
            <Ionicons name="arrow-undo" color={"#F4A896"} size={22}/>
          </Text>
          <Image
            source={require('../../assets/imagens-icons/logoVoltar.png')}
            className="bottom-0 left-6 absolute"
          />
        </TouchableOpacity>
      </View>

      {/* Toggle de notificação */}
      <View className="w-11/12  flex-row items-center">
        <TouchableOpacity
        className="mt-5"
          onPress={() => setHabilitado(!habilitado)}
          activeOpacity={0.9}
          style={{
            width: 45,
            height: 25,
            borderRadius: 999,
            backgroundColor: habilitado ? "#24A114" : "#BA1111",
            justifyContent: "center",
            paddingHorizontal: 2,
          }}
        >
          <Animated.View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#fff",
              transform: [{ translateX: habilitado ? 20 : 0 }],
            }}
          />
        </TouchableOpacity>
        <Text className=" mt-5 ml-3 text-[#2E4A62] font-serif font-bold text-lg">
          Receber notificação para conversar
        </Text>
      </View>

      

      {/* Pop-up da notificação de novo desabafo */}
      <Modal visible={popupNotificacao} transparent animationType="fade">
        <View className="flex-1 bg-[#00000088] justify-start items-center">
          <Animated.View
          className="bg-[#ffffff] w-5/6 p-6 rounded-3xl mt-16"
          style={{ transform: [{ translateY: slideAnim }], borderRadius:30 }}>
            <Text className="text-xl text-[#2E4A62] font-bold mb-3">
              📢 Novo desabafo
            </Text>
            <Text className="text-[#2E4A62] mb-5">
              Um usuário deseja desabafar. Você aceita?
            </Text>
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                className="bg-[#8DAE95] px-4 py-2 rounded-full"
                onPress={() => {
                  setPopupNotificacao(false);
                  setCarregando(true);
                  // você pode redirecionar depois com setTimeout
                }}>
                <Text className="text-white font-bold">Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#e2aea0] px-4 py-2 rounded-full"
                onPress={() => setPopupNotificacao(false)}>
                <Text className="text-[#2E4A62] font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* parte de carregamento */}
      {!carregando && (
        <View className="w-full mt-8">
          <View className="flex-row items-start ml-7">
            <TouchableOpacity
            disabled={!habilitado}
            onPress={() => {
              if (habilitado) {
                setPopupNotificacao(true);
              }
            }}
            className="mr-2"
            >
              <IconeCarregando />
            </TouchableOpacity>
            <Text className="text-[#2E4A62] font-serif text-lg font-bold ml-1 mb-2">
            Buscando alguém que queira ser ouvido
            </Text>
          </View>
          <View className="w-full px-3">
            <Text className="text-[#2E4A62] font-serif text-base ml-3">
              Isso pode levar alguns instantes. {"\n"}
              Estamos conectando você com alguém que precisa de sua atenção para desabafar.
            </Text>
          </View>
        </View>
      )}

      {/* Pop-up de ouvintes disponíveis */}
      {carregando && !popupNotificacao &&(
        <ScrollView className="flex-1 w-full px-0"
        contentContainerStyle={{ alignItems: "center", paddingTop: 40}}>
          {popup1 && (
            <View className="bg-[#f4a79685] w-11/12 h-28 justify-center mb-4"
              style={{ borderRadius: 30}}>
              <View className="ml-5">
                <Text className="text-[#2E4A62] font-serif font-bold text-2xl">GatoDeBotas</Text>
                <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de desabafar, aceita?</Text>
                <View className="flex-row w-full justify-end gap-3">
                  <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                     onPress={() => router.push({ pathname: './chatOuvinte', params: {nome: 'GatoDeBotas'}})}>
                    <Text className="text-[#FFFFFF] font-serif font-bold text-base">Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[#A71212] w-16 h-8 rounded-full items-center justify-center mr-3"
                    onPress={() => {
                      setPopup1(false);
                      setRecusados(prev => {
                        const novo = prev + 1;
                        if (novo === 3){
                          setCarregando(false);
                          setTimeout(() => setCarregando(true), 10000);
                        }
                        return novo;
                      })
                    }}>
                    <Text className="text-[#FFFFFF] font-serif font-bold text-base">Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {popup2 && (
            <View className="bg-[#f4a79685] w-11/12 h-28 justify-center mb-4"
              style={{ borderRadius: 30}}>
              <View className="ml-5">
                <Text className="text-[#2E4A62] font-serif font-bold text-2xl">Anônimo</Text>
                <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de desabafar, aceita?</Text>
                <View className="flex-row w-full justify-end gap-3">
                  <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                     onPress={() => router.push({ pathname: './chatOuvinte', params:{nome: 'Anônimo'}})}>
                    <Text className="text-[#FFFFFF] font-serif font-bold text-base">Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[#A71212] w-16 h-8 rounded-full items-center justify-center mr-3"
                    onPress={() => {
                      setPopup2(false);
                      setRecusados(prev => {
                        const novo = prev + 1;
                        if (novo === 3){
                          setCarregando(false);
                          setTimeout(() => setCarregando(true), 10000);
                        }
                        return novo;
                      })
                    }}>
                    <Text className="text-[#FFFFFF] font-serif font-bold text-base">Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {popup3 && (
            <View className="bg-[#f4a79685] w-11/12 h-28 justify-center"
            style={{ borderRadius: 30}}>
            <View className="ml-5">
              <Text className="text-[#2E4A62] font-serif font-bold text-2xl">BolodeCenouraS2</Text>
              <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de desabafar, aceita?</Text>
              <View className="flex-row w-full justify-end gap-3">
                <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                   onPress={() => router.push({ pathname: './chatOuvinte', params:{nome: 'BolodeCenousaS2'}})}>
                  <Text className="text-[#FFFFFF] font-serif font-bold text-base">Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#A71212] w-16 h-8 rounded-full items-center justify-center mr-3"
                  onPress={() => {
                    setPopup2(false);
                    setRecusados(prev => {
                      const novo = prev + 1;
                      if (novo === 3){
                        setCarregando(false);
                        setTimeout(() => setCarregando(true), 10000);
                      }
                      return novo;
                    })
                  }}>
                  <Text className="text-[#FFFFFF] font-serif font-bold text-base">Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          )}
        </ScrollView>
      )}

      {temDenuncia && (
        <View className="absolute bottom-32 z-10 w-11/12 items-center bg-[#ffffff88] p-5"
        style={{borderRadius: 30}}>
          <Text className="text-[#A71212] font-serif text-sm text-center font-bold">
            ⚠️ Este perfil possui 1 denúncia. O limite é 7 antes de ser banido.
          </Text>
        </View>
      )}

      {/* Rodapé */}
      <View className="w-full h-24 items-center absolute bottom-5">
        <View className="bg-[#ffffff88] justify-center w-11/12 h-full"
          style={{ borderRadius: 30}}>
          <View className="px-5 items-center">
            <Text className="text-[#2E4A62] font-serif text-base text-center">
            Lembre-se: do outro lado da tela há alguém confiando em você. Seja gentil, paciente e respeitoso. Cada palavra pode fazer a diferença. 
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
}