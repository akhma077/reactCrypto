import { useState, useRef } from 'react';
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd';
import { useCrypto } from '../../context/criptoContext';
import { CoinInfo } from '../coinInfo/CoinInfo';

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export function AddAssetForm() {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset } = useCrypto();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  return (
    <Form
      validateMessages={validateMessages}
      name="basic"
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} width={40} style={{ marginRight: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>

      <CoinInfo coin={coin} />

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        type="number"
        rules={[
          {
            required: true,
            min: 0,
          },
        ]}
      >
        <InputNumber onChange={handleAmountChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
