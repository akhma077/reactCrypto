import { cryptoData, assets } from './data';

export function fetchCryptoData() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoData);
    }, 1);
  });
}
export function fetchCryptoAssets() {
  return new Promise((res) => {
    setTimeout(() => {
      res(assets);
    }, 1);
  });
}
