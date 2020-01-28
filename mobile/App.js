import React from 'react';
import { StatusBar, YellowBox } from 'react-native'

import Routes from './src/routes'


YellowBox.ignoreWarnings([//ignorar mensagens da caixa amarela
  'Unrecognized WebSocket'
])
export default function App() {
  return (
    <>
      <StatusBar barStyle="ligth-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}

