import { Flex, Tag, Typography, Divider } from 'antd';

export function CoinInfoModal({ coin }) {
  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} width={40} style={{ marginLeft: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>

      <Divider />

      <Typography.Paragraph>
        <Typography.Text strong> 1 hour: {} </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>

        <Typography.Text strong> 1 day: {} </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>

        <Typography.Text strong> 1 week: {} </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price: {coin.price.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: {coin.priceBtc}</Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: {coin.marketCap}</Typography.Text>
      </Typography.Paragraph>

      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>contractAddress: {coin.contractAddress}</Typography.Text>
        </Typography.Paragraph>
      )}
    </>
  );
}
