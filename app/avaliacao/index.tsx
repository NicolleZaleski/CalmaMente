import { Link, useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState,useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, TextInput, Modal, ScrollView, Animated, Easing } from "react-native";

export default function Avaliacao() {
  const [ estrelas, setestrelas] = useState(0);
  const router = useRouter();

  return (
    <View className="flex-1 items-center bg-[#9DC8C8] w-full">
      <View className="absolute top-24 w-full h-full items-center opacity-50">
        <Image
            source={require('../../assets/imagens-icons/logoCalmaMente.jpg')}
            className="w-72 h-72 items-center justify-center mt-44 "
        />
      </View>

      <View className="flex-1 w-full justify-center items-center">
        <View className="bg-[#ffffffc0] mb-36  p-6 w-96 h-60"
          style={{ borderRadius: 30}}>
          <View className="w-full items-center pt-3 flex-col gap-2">
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold text-center">O quanto você se sentiu acolhido?</Text>
            <View className="flex-row space-x-2 justify-center mt-4">
              {[1,2,3,4,5].map((estrela) => (
                <TouchableOpacity key={estrela} onPress={() => setestrelas(estrela)}>
                  <FontAwesome name={estrela <= estrelas ? 'star' : 'star-o'}
                  size={36} color="#FFD700"/>
                </TouchableOpacity>
                ))}
            </View>
            <View className="w-full items-end">
              <TouchableOpacity className="py-2 w-24 bg-[#2E4A62] justify-center items-center"
              style={{borderRadius: 30}}
              onPress={() => router.push('/')}>
                <Text className="text-[#FDF6EC] font-serif font-bold text-lg">Enviar</Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
      </View>
    </View>
  );
}