import { createContext, useState, useEffect, useContext } from 'react';
import { fetchCryptoAssets, fetchCryptoData } from '../api/axios';
import { percentDiffrence } from '../utils/percentDeff';

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDiffrence(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCryptoData();
      const assets = await fetchCryptoAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  return (
    <CryptoContext.Provider value={{ loading, assets, crypto, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}
export function useCrypto() {
  return useContext(CryptoContext);
}
