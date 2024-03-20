import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import style from './style'
import logoImg from '../../assets/logo.png'

export default function Detail() {
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={() => { }}>
                    <Feather size={28} name="arrow-left" color={'#e02041'} />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={style.incidentValue}>apad</Text>

                <Text style={style.incidentProperty}>Caso</Text>
                <Text style={style.incidentValue}>Cachorra atropelada</Text>

                <Text style={style.incidentProperty}>Valor</Text>
                <Text style={style.incidentValue}>R$: 700,00</Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o Dia</Text>
                <Text style={style.heroTitle}>Seja o Herói deste Caso.</Text>
                <Text style={style.heroDescription}>Entre e Contato</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={() => {}}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={() => {}}>
                        <Text style={style.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}