import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, ScrollView, Animated, Easing } from "react-native";

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


export default function Desabafar() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [recusados, setRecusados] = useState(0);
  const { apelido } = useLocalSearchParams();
  const temDenuncia = apelido === "bolodecenouras2";

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
      <View className="w-full h-20 bg-[#8BAA91] flex-row"
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

      {/* parte de carregamento */}
      {!carregando && (
        <View className="w-full mt-8">
          <View className="flex-row items-start ml-7">
            <IconeCarregando/>
            <Text className="text-[#2E4A62] font-serif text-lg font-bold ml-1 mb-2">Buscando alguém para te ouvir...</Text>
          </View>
          <View className="w-full px-3">
            <Text className="text-[#2E4A62] font-serif text-base ml-3">
              Isso pode levar alguns instantes. {"\n"}
              Estamos conectando você com alguém que quer te ouvir com atenção.
            </Text>
          </View>
        </View>
      )}

      {/* Pop-up de ouvintes disponíveis */}
      {carregando && (
        <ScrollView className="flex-1 w-full px-0"
        contentContainerStyle={{ alignItems: "center", paddingTop: 40}}>
          {popup1 && (
            <View className="bg-[#f4a79685] w-11/12 h-28 justify-center mb-4"
              style={{ borderRadius: 30}}>
              <View className="ml-5">
                <Text className="text-[#2E4A62] font-serif font-bold text-2xl">Anônimo</Text>
                <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de te ouvir, aceita?</Text>
                <View className="flex-row w-full justify-end gap-3">
                  <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                     onPress={() => router.push({ pathname: './chatDesabafoAnon', params: {nome: 'Anônimo'}})}>
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
                <Text className="text-[#2E4A62] font-serif font-bold text-2xl">VampiraVintage</Text>
                <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de te ouvir, aceita?</Text>
                <View className="flex-row w-full justify-end gap-3">
                  <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                     onPress={() => router.push({ pathname: './chatDesabafoAnon', params:{nome: 'VampiraVintage'}})}>
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
              <Text className="text-[#2E4A62] font-serif font-bold text-2xl">NirvanaS2</Text>
              <Text className="text-[#2E4A62] font-serif font-bold mt-1">Gostaria de te ouvir, aceita?</Text>
              <View className="flex-row w-full justify-end gap-3">
                <TouchableOpacity className="bg-[#3B6839] w-16 h-8 rounded-full items-center justify-center"
                   onPress={() => router.push({ pathname: './chatDesabafoAnon', params:{nome: 'NirvanaS2'}})}>
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
            Lembre-se: há uma pessoa real do outro lado da tela, disposta a te ouvir com atenção. Seja gentil e respeitoso durante a conversa. 
            </Text>
          </View>
        </View>
      </View>

      
    </View>
  );
}