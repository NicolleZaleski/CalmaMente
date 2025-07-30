import { Link, useRouter, useNavigation } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, TextInput, Modal, ScrollView } from "react-native";

export default function Desabafar() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center bg-[#9DC8C8] w-full">
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
        </View>
    );
}