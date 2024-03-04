import React from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles, initializeIcons } from '@fluentui/react';
import Contact from './Component/Contact';

export const App: React.FunctionComponent = () => {
  initializeIcons();
  return (
    <Contact/>
  );};