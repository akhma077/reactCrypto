import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/criptoContext';
import { useEffect, useState } from 'react';
import { CoinInfoModal } from '../modal/CoinInfoModal';
import { AddAssetForm } from '../addForm/AddAssetForm';

const headerStyle = {
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export function AppHeader() {
  const { crypto } = useCrypto();

  const [select, setSelect] = useState();
  const [coin, setCoin] = useState();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function keypress(event) {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleCloseModal() {
    setIsModalOpen((prev) => !prev);
  }

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setIsModalOpen(true);
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value={'press / to open'}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img width={30} src={option.data.icon} alt="" /> {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setOpenDrawer((prev) => !prev)}>
        Add Asset
      </Button>

      <Modal open={isModalOpen} onOk={handleCloseModal} onCancel={handleCloseModal} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        destroyOnClose
        title="Add Asset"
        onClose={() => setOpenDrawer((prev) => !prev)}
        open={openDrawer}
      >
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  );
}
