import { Link, useRouter, useNavigation } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, TextInput, Modal, ScrollView, Animated, Easing } from "react-native";

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
    <Animated.View style={{transform: [{ rotate: rotacao}] }}>
      <EvilIcons name="spinner-3" size={44} color={"#2E4A62"}/>
    </Animated.View>
  );
}

export default function Desabafar() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(true);
    }, 8000);

    return () => clearTimeout(timer);
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
          onPress={() => router.push('/participar')}>
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
        <View className="items-center mb-16">
          <View className="flex-row items-center mb-2">
            <IconeCarregando />
            <Text className="text-[#2E4A62] text-lg font-semibold ml-3">Buscando alguém para te ouvir...</Text>
            <Text>Isso pode levar alguns instantes. {"\n"}
                  Estamos conectando você com alguém que quer te ouvir com atenção.</Text>
          </View>
        </View>
      )}

      <Modal>
        <View>
            
        </View>
      </Modal>
    </View>
  );
}