import { Link, useRouter, useNavigation } from "expo-router";
import { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function Index() {
  const [popupObjetivo, setPopupObjetivo] = useState(false);
  const router = useRouter();
  
  return (
    <View className="flex-1 p-5 items-center bg-[#9DC8C8] w-full">
      {/* Imagem */}
      <View className="w-full items-center">
        <Image
          source={require('../assets/imagens-icons/logoCalmaMente.jpg')}
          className="w-96 h-96 items-center justify-center mt-44 "
        />
      </View>

      {/* Botões */}
      <View className="gap-6">
        <TouchableOpacity
          onPress={() => setPopupObjetivo(true)}
          className="w-52 h-14 mt-0 bg-[#8BAA91] items-center justify-center rounded-full">
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold">Objetivo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/participar')}
          className="w-52 h-14 mt-0 bg-[#8BAA91] items-center justify-center rounded-full">
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold">Participar</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View className="bottom-6 absolute">
        <Text className="font-serif text-center text-sm text-[#2E4A62] font-bold">
            Precisa de ajuda imediata? O CVV está disponível 24h pelo telefone 188 ou em 
            <Link  className="underline "
            href={'https://cvv.org.br/'}> www.cvv.org.br</Link></Text>  
      </View>

        
      
    </View>
  );
}

