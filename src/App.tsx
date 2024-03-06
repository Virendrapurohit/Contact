import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles, initializeIcons } from '@fluentui/react';
import Contact from './Component/Contact';
import "./App.css";


export const App: React.FunctionComponent = () => {
  initializeIcons();
  return (


    <Contact/>
    );};
    
   