import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import style from './style'
import logoImg from '../../assets/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'
// Lib para uso no email Buttom
import * as  MailComposer  from 'expo-mail-composer'
// Deeplinke para uso no whatsapp Buttom
import {Linking} from 'react-native'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()
    const incident = route.params.incident;
    
    const messageHero = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: ${incident.title} com o valor de ${ Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(incident.value)}.`
    function navigateBack(){
       navigation.goBack() 
    }

    // Funções para enviar email e mensagem no whatsapp
    // Para email vamos utlizar um pacote do proprio expo, o EXPO-EMAIL-COMPOSER
    function sendMail(){
        MailComposer.composeAsync({
            // Assunto da mensagem:
            subject: `Heroi do caso: ${incident.title}`,
            // Destinatario
            recipients: ['contato_josuecosta@hotmail.com', incident.email],
            // Conteudo da mensagem
            body: messageHero,

        })

    }

    // Vamos utilizar uma tecnologia chamada deeplinke
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=65993408371&text=${messageHero}`)
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather size={28} name="arrow-left" color={'#e02041'} />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

                <Text style={style.incidentProperty}>Caso</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>Detalhes</Text>
                <Text style={style.incidentValue}>{incident.description}</Text>

                <Text style={style.incidentProperty}>Valor</Text>
                <Text style={style.incidentValue}>
                    {
                          // Para utilização do intl na formatação dos valores em reais, vamos intalar o pacote INTL, ele garante o funcionamento em todos os dispositivos moveis. A configuração sera realizada no arquivo app.js da aplicação a fim de garantir o funcionamento em todo aplicativo.
                          Intl.NumberFormat('pt-BR',
                          {
                              style: 'currency',
                              currency: 'BRL'
                          }).format(incident.value)
                    }
                </Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o Dia</Text>
                <Text style={style.heroTitle}>Seja o Herói deste Caso.</Text>
                <Text style={style.heroDescription}>Entre e Contato</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}