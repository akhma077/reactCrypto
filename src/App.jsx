import React from 'react';
import { CryptoContextProvider } from './context/criptoContext';
import { AppLayout } from './components/layout/AppLayout';

export function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
