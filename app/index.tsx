import { View, Image } from "react-native";



export default function Index() {
  
  return (
    <View className="flex-1 p-5 items-center bg-[#9DC8C8]">
      <View>
        <Image
          source={require('../assets/imagens-icons/logoCalmaMente.jpg')}
          className="w-96 h-96 items-center justify-center mt-48"
        />
        
      </View>
    </View>
  );
}

