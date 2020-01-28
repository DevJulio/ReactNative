import React, { useState, useEffect } from 'react';
import api from './services/api' //chamando a api do backend
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
/*
componente: é uma função que retorna alguma coisa relacionada a interface, como arquivo html, css ou js com html
Propriedade: informações que o componente pai, que é o componente principal, passa para os demais componentes que ele comporta
Estado: Informações mantidas pelo componente, (Imutabilidade )
*/
//import Header from './Header'// isso é um bloco isolado, um componete q nao interfere no restante da aplicação

//toda função de um componete, é criada dentro dele mesmo, uma função aninhada


function App() {

  const [devs, setDevs] = useState([])



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')// essa funçao esta buscando da api os devs método get
      setDevs(response.data);

    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
  
    const response = await api.post('/devs', data)


    setDevs([...devs, response.data])
    console.log(response.data)
  }
  return (
    <>
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}/>
        </aside>
        <main>
          <ul>

            {devs.map(dev => (//mesma coisa do innerHTML acessamdo dev

              <DevItem key={dev._id} dev={dev} />
            ))}

          </ul>
        </main>
      </div >
    </>
  );
}

export default App;
