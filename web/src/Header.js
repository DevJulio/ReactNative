import React from 'react';

function Header(props) { //recebendo parametros da classe pai, classe app
    return (<h1>{props.title}</h1>);//acessando o  componente pai no atributo ou propriedade title
}
export default Header;  