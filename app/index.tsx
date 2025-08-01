import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, Modal, ScrollView } from "react-native";

export default function Index() {
  const [popupObjetivo, setPopupObjetivo] = useState(false);
  const router = useRouter();
  
  return (
    <View className="flex-1 p-5 items-center bg-[#9DC8C8] w-full">
      {/* Imagem */}
      <View className="w-full items-center">
        <Image
          source={require('../assets/imagens-icons/logoCalmaMente.jpg')}
          className="w-96 h-96 items-center justify-center mt-36 "
        />
      </View>

      {/* BOTÕES */}
      <View className="gap-6">
        {/* Botão 1 */}
        <TouchableOpacity           
          onPress={() => setPopupObjetivo(true)}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold">Objetivo</Text>
        </TouchableOpacity>
        {/* Botão 2 */}
        <TouchableOpacity           
          onPress={() => router.push('./participar')}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-2xl font-bold">Participar</Text>
        </TouchableOpacity>
      </View>

      {/* POP-UP OBJETIVO */}
      <Modal
        visible={popupObjetivo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPopupObjetivo(false)}>

          <View className="flex-1 bg-[#9DC8C8] relative"> 
            <View className="absolute top-24 w-full h-full items-center ">
              <Image
                source={require('../assets/imagens-icons/logoCalmaMente.jpg')}
                className="w-11/12 h-96 items-center justify-center mt-44 "
              />
            </View>

            <View className="bottom-6 absolute w-full items-center">
              <Text className="font-serif text-center text-sm text-[#2E4A62] font-bold">
                Precisa de ajuda imediata? O CVV está disponível 24h pelo telefone 188 ou em <Link  className="underline "
                  href={'https://cvv.org.br'}>www.cvv.org.br</Link>
              </Text>  
            </View>

            <View className="flex-1 bg-[#00000085] justify-center items-center">
              <View className="bg-[#ffffffa4] p-6 w-11/12 h-5/6"
                style={{ borderRadius: 30}}>
                <View className="w-full items-center pt-3">
                  <Text className="text-[#2E4A62] font-serif text-2xl font-bold text-center"
                    >Seja bem-vindo ao CalmaMente
                  </Text>
                </View>
                <ScrollView className="mt-5" contentContainerStyle={{paddingBottom: 20}}>
                  <Text className="text-[#2E4A62] w-full font-mono text-base font-light text-justify">
                    <Text className="font-bold font-serif">O que é o CalmaMente?{"\n"}</Text>
                    O CalmaMente é um espaço acolhedor, anônimo e gratuito, criado para conectar pessoas que precisam desabafar com outras dispostas a escutar com empatia e respeito. Aqui, qualquer pessoa pode compartilhar o que sente ou se oferecer para ouvir, sem julgamentos e com sigilo.{"\n\n"}

                    <Text className="font-bold font-serif">Nosso objetivo{"\n"}</Text>
                    Queremos oferecer um apoio emocional mais leve, acessível e humano para momentos de solidão, estresse, ansiedade ou simplesmente para quando você só precisa ser ouvido.
                    Não somos uma plataforma terapêutica nem um serviço de emergência. O CalmaMente não substitui profissionais da saúde mental, mas pode ser um primeiro passo ou um apoio complementar para quem busca alívio emocional no cotidiano.{"\n\n"}

                    <Text className="font-bold font-serif">Por que criamos o CalmaMente?{"\n"}</Text>
                    Sabemos que, muitas vezes, o que mais precisamos é de alguém que nos escute com atenção e carinho — mesmo que por pouco tempo. Queremos proporcionar um ambiente informal, íntimo e seguro para esse tipo de conversa, sem burocracias, nomes ou julgamentos.{"\n\n"}


                    <Text className="font-bold font-serif">Terapia também é importante{"\n"}</Text>
                    Conversar com alguém ajuda, mas se sentimentos como tristeza profunda, ansiedade ou angústia persistirem, buscar ajuda profissional é fundamental. Psicólogos, psiquiatras e terapeutas são preparados pra oferecer o acompanhamento que você merece.
                    Você não está sozinho. Estamos aqui por você, e você merece cuidado.{"\n\n"}


                    <Text className="font-bold font-serif">Casos mais urgentes{"\n"}</Text>
                    Se você está enfrentando uma crise emocional mais intensa, por favor, procure ajuda especializada.                     Você pode entrar em contato com o CVV (Centro de Valorização da Vida), um serviço gratuito e sigiloso, disponível 24 horas por dia.{"\n"}  
                  </Text>
                  <Text className="text-[#2E4A62] font-serif font-bold text-center">Ligue 188 ou acesse <Link className="underline"
                    href={'http://cvv.org.br'}>www.cvv.org.br</Link> {"\n"}
                  </Text>
                </ScrollView>
                <TouchableOpacity
                  onPress={() => setPopupObjetivo(false)}
                  className="mt-4 w-28 h-10 items-center justify-center bg-[#355C4B] rounded-full flex-row GAP"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 8, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                    <Text className="text-[#F4A896] text-xl">
                      <Ionicons name="arrow-undo" color={"#F4A896"} size={19}/> 
                    </Text>
                    <Text className="text-[#F4A896] text-xl font-bold font-serif">Voltar</Text> 
                  </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>

      {/* Rodapé */}
      <View className="bottom-6 absolute">
        <Text className="font-serif text-center text-sm text-[#2E4A62] font-bold">
          Precisa de ajuda imediata? O CVV está disponível 24h pelo telefone 188 ou em <Link  className="underline"
            href={'https://cvv.org.br/'}>www.cvv.org.br</Link>
        </Text>  
      </View>

        
      
    </View>
  );
}

