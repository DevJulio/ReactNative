import React, { useState, useEffect } from 'react'//use effect funciona como oncreate ou então onload
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'//Tipo da tela e também componente de imagem, inputs de texto 
import MapView, { Marker, Callout } from 'react-native-maps'//Marker, marcadores no mapa, Callout tudo que colocar dentro dele, vai aparecer quando clicar no avatar
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'//ícones do expo


import api from '../services/api'
import { connect, disconnect } from '../services/socket'



function Main({ navigation }) {//para navegar entre telas

    const [devs, setDevs] = useState([])// para listagem, se inicia com um array vazio
    const [currentRegion, setCurrentRegion] = useState(null)//criando uma variavel nos moldes do java get e set e inicializando com null
    const [techs, setTechs] = useState('')

    useEffect(() => {

        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const { latitude, longitude } = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        loadInitialPosition()

    }, [])//com o array vazio quer dizer que vai executar somente uma vez

    function setupWebsocket() {
        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs
        );
    }


    async function loadDevs() {//acessar a api
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        console.log(response.data)
        setDevs(response.data.devs)
        setupWebsocket()
    }


    function handleRegionChanged(region) {
        setCurrentRegion(region)

    }

    if (!currentRegion) {
        return null
    }

    //sempre que existirem mais de um bloco na tela, como dois paineis , é necessário cercar com <> </>, que funciona como uma div
    //a função onRegionChangeComplete, executará a função q esta dentro das chaves sempre que a posicao mudar
    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map} >
                {devs.map(dev => (//popular tela ou mapa nese caso
                    <Marker
                        key={dev._id}
                        coordinate={{
                            longitude: dev.location.coordinates[0],//acessando o primeiro item do array coordinate vindo da api
                            latitude: dev.location.coordinates[1],

                        }}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: dev.avatar_url }}>
                        </Image>
                        <Callout onPress={() => {//NAVEGAÇÃO
                            navigation.navigate('Profile', { github_username: dev.github_username })//navegação entre páginas e passagem de parametro, como bundle do android
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"//coloca a primeira letra de cada palavra como maíuscula
                    autoCorrect={false}//nao vai corrigir o texto do input
                    value={techs} //equivalente ao id do html
                    onChangeText={setTechs}//chamando a função com o texto do campo
                />
                <TouchableOpacity onPress={(loadDevs)} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({//css total
    map: {//css do componente
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',

    },
    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',//ficar por cima do mapa
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,//sombra do elementos
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;