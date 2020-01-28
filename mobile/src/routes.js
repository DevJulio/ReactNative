import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main';
import Profile from './pages/Profile';
//As rotas foram importadas para que sejam acessadas
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'//título da página
            }
        },
    }, {
        defaultNavigationOptions: {//Configurações que serão aplicadas a todas as telas da aplicação
            headerTintColor: '#fff',//Cor do texto do header
            headerTitleAlign: "center",
            headerStyle: {//Header de todas as páginas
                backgroundColor: '#7D40E7'
            }
        }
    })
);

export default Routes