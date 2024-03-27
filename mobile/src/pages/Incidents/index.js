import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import logoImg from '../../assets/logo.png'
import './style'
import style from "./style";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {
    // O flatlist sera utilizado para fazer as listagens, atraves dele iremos controlar o scroll do mouse e o carregamento de mais casos.
    // Criando a navegação do botao
    const navigation = useNavigation()

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    // Controle de paginação
    const [page, setPage] = useState(1)
    // Estado de login, sera avaliado quando estiver buscando novos dados e não estiver buscando dados.
    const [loading, setLoading] = useState(false)


    async function loadIncidents() {

        // Se o loading estiver sendo realizado então o sistema não buscara outra ate que  a trasação conclua.
        if (loading) {
            return;
        }

        // Se o total de registro for maior que 0 e o numero de incidents for igual ao total, entao não faz sentido buscar mais informações.
        if (total > 0 && incidents.length === total) {
            return
        }

        // Altera o loading para true antes de iniciar a requisição
        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        // Incrementar resultados
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])

        // Incrementar numero de paginas
        setPage(page + 1)

        // Apos a requisição aletere o loading para false
        setLoading(false)
    }
    // Buscando dados da api e listando
    useEffect(() => {
        loadIncidents()
    }, [])


    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>
                        {total} de {total == 1 ? 'caso' : 'casos'}
                    </Text>
                </Text>
            </View>

            <Text style={style.title}>Bem Vindo!</Text>
            <Text style={style.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                // Função disparada quando o usuario chegar no final da listagem, ela executa o load de incidents
                onEndReached={loadIncidents}

                // Escuta quantos % do final da pagina o usuario precisa estar para que seja carregado novos itens, ate mesmo entes do final da lista.
                // neste caso 0.2 equivale a 20%
                onEndReachedThreshold={0.2}
                style={style.incidentList}
                // Insira aqui o resulta da busca na api
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}

                // Desestruturação do retorno da api e seleção somente dos dados necessarios na listagem
                // Por padrão os itens dentro de uma listagem vem nomeados como item, então alteramos para incident.
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>Caso</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

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
                        <TouchableOpacity style={style.detailsButton} onPress={() => navigateToDetail(incident)}>
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