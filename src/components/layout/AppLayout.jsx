import { Layout, Spin } from 'antd';
import { AppContent, AppHeader, AppSider } from '../index';
import { useContext } from 'react';
import { CryptoContext } from '../../context/criptoContext';

export function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
