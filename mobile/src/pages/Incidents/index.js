import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import logoImg from '../../assets/logo.png'
import './style'
import style from "./style";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Incidents() {

    // O flatlist sera utilizado para fazer as listagens, atraves dele iremos controlar o scroll do mouse e o carregamento de mais casos.

    // Criando a navegação do botao
    const navigation = useNavigation()

    function navigateToDetail(){
        navigation.navigate('Detail')
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>
                        0 casos
                    </Text>
                </Text>
            </View>
            
            <Text style={style.title}>Bem Vindo!</Text>
            <Text style={style.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                style={style.incidentList}
                data={[1, 2, 3, 4]}
                keyExtractor={incident => String(incident)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>apad</Text>

                        <Text style={style.incidentProperty}>Caso</Text>
                        <Text style={style.incidentValue}>Cachorra atropelada</Text>

                        <Text style={style.incidentProperty}>Valor</Text>
                        <Text style={style.incidentValue}>R$: 700,00</Text>
                        <TouchableOpacity style={style.detailsButton} onPress={navigateToDetail}>
                            <Text style={style.detailsButtonText}>
                                Ver Mais Detalhes
                            </Text>
                            <Feather name='arrow-right' size={16} color={'#e02041'} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}