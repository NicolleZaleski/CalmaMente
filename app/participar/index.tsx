import { Link, useRouter, useNavigation } from "expo-router";
import { useState } from "react";
import { FontAwesome, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Text, TextInput, Modal, ScrollView } from "react-native";

export default function Participar() {
  const [popupParticipar, setPopupParticipar] = useState(false);
  const router = useRouter();
  
  return (
    <View className="flex-1 p-5 items-center bg-[#9DC8C8] w-full">
      {/* Caixa de input */}
      <View className="w-full mt-20 items-center">
        <TextInput
          className="w-96 h-11 bg-[#bad8d8] rounded-full px-5 text-lg font-serif text-[#2E4A62]"
          placeholder="Digite seu apelido (Opcional)"
          placeholderTextColor="[#2E4A62]"
        />
      </View>
      {/* Logo */}
      <View className="w-full items-center">
        <Image
          source={require('../../assets/imagens-icons/logoCalmaMente.jpg')}
          className="w-96 h-96 items-center justify-center mt-5 "
        />
      </View>
      {/* Botões */}
      <View className="gap-6">
        {/* Botão 1 */}
        <TouchableOpacity           
          onPress={() => setPopupParticipar(true)}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-xl font-bold">Como Participar</Text>
        </TouchableOpacity>
        {/* Botão 2 */}
        <TouchableOpacity           
          onPress={() => router.push('./participar')}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-xl font-bold">Quero Desabafar</Text>
        </TouchableOpacity>
        <TouchableOpacity           
          onPress={() => setPopupParticipar(true)}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-xl font-bold">Quero Ouvir</Text>
        </TouchableOpacity>
        {/* Botão 2 */}
        <TouchableOpacity           
          onPress={() => router.push("/")}
          className="w-52 h-14 mt-0 bg-[#8BAA91] border-4 border-[#8BAA91] items-center justify-center rounded-full active:bg-[#F4A896] active:opacity-100">
            <Text className="text-[#2E4A62] font-serif text-xl font-bold">Menu Inicial</Text>
        </TouchableOpacity>
      </View>

      {/* POP-UP OBJETIVO */}
      <Modal
        visible={popupParticipar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPopupParticipar(false)}>

          <View className="flex-1 bg-[#9DC8C8] relative"> 
            <View className="absolute top-24 w-full h-full items-center ">
              <Image
                source={require('../../assets/imagens-icons/logoCalmaMente.jpg')}
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
              <View className="bg-[#ffffffa4] rounded-3xl p-6 w-11/12 h-5/6">
                <View className="w-full items-center pt-3">
                  <Text className="text-[#2E4A62] font-serif text-2xl font-bold text-center"
                    >Usuários
                  </Text>
                </View>
                <ScrollView className="mt-5" contentContainerStyle={{paddingBottom: 20}}>
                  <Text className="text-[#2E4A62] w-full font-mono text-base font-light text-justify">
                    No CalmaMente, você pode escolher entre dois caminhos: Desabafar com alguém ou oferecer escuta a quem precisa. Ambos são anônimos, respeitosos e feitos por texto.{"\n\n"}

                    <Text className="font-bold font-serif">Quero Desabafar{"\n"}</Text>
                    Se você estiver passando por um momento difícil, sentindo-se sobrecarregado, sozinho ou apenas com vontade de colocar seus sentimentos para fora, você pode escolher a opção “Quero desabafar”.{"\n\n"}

                    Como funciona? </Text>
                    <View className="w-full pl-4">
                      <Text className="text-[#2E4A62] font-mono text-base font-light text-justify">
                        <Text className="font-bold font-serif">•</Text>ㅤO app busca alguém disponível para te ouvir.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤAssim que um ouvinte aceitar sua solicitação, uma sala de conversa anônima será aberta.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤA conversa tem duração de 30 minutos, com opção de continuar caso os dois concordem.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤAo final, você poderá avaliar a conversa e, se necessário, reportar comportamentos inadequados.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤVocê não precisa se identificar. Pode usar um apelido (opcional) e conversar no seu tempo, do seu jeito.{"\n"}
                      </Text>
                    </View>
                    <Text className="text-[#2E4A62] w-full font-mono text-base font-light text-justify">
                    O importante aqui é: você será ouvido(a) com respeito.{"\n\n"}

                    <Text className="font-bold font-serif">Quero Ouvir Alguém{"\n"}</Text>
                    Se você deseja ajudar pessoas ouvindo com empatia, paciência e respeito, pode escolher a opção “Quero ouvir alguém”.
                    Não é necessário ser profissional da área — apenas ouvir com empatia já faz muita diferença.{"\n\n"}

                    Como funciona? </Text>
                    <View className="w-full pl-4">
                      <Text className="text-[#2E4A62] font-mono text-base font-light text-justify">
                        <Text className="font-bold font-serif">•</Text>ㅤVocê poderá ativar um botão para receber notificações quando alguém quiser desabafar.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤQuando houver alguém buscando ajuda, o app te perguntará se deseja aceitar a conversa.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤAo aceitar, será aberta uma sala de chat anônima com tempo de 30 minutos, podendo ser estendida.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤAntes de iniciar, o app exibirá uma mensagem lembrando da importância do respeito e acolhimento durante toda a conversa.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤAo final, você também poderá avaliar a experiência e reportar qualquer comportamento inapropriado.{"\n"}
                      </Text>
                    </View>
                    <Text className="text-[#2E4A62] w-full font-mono text-base font-light text-justify">
                    Se durante a conversa você perceber que a pessoa está em um estado emocional mais grave, poderá sugerir que ela busque apoio profissional ou até mesmo indicar o CVV (188).{"\n\n"}

                    <Text className="font-bold font-serif">Ambos os lados</Text> </Text>
                    <View className="w-full pl-4">
                      <Text className="text-[#2E4A62] font-mono text-base font-light text-justify">
                        <Text className="font-bold font-serif">•</Text>ㅤSão anônimos e seguros.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤPodem encerrar a conversa a qualquer momento.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤTêm a opção de prolongar a conversa.{"\n"}
                        <Text className="font-bold font-serif">•</Text>ㅤTêm acesso ao botão de reportar em caso de ofensas, condutas abusivas ou desrespeito.
                      </Text>
                    </View>
                    
                </ScrollView>
                <TouchableOpacity
                  onPress={() => setPopupParticipar(false)}
                  className="mt-4 w-28 h-10 items-center justify-center bg-[#355C4B] rounded-full"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 8, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                    <Text className="text-[#F4A896] text-xl font-bold font-serif">
                      <Entypo name="arrow-bold-left" color={"#F4A896"} size={20}/> Voltar
                    </Text>
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