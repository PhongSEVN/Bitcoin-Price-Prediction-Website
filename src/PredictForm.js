import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Card, message } from 'antd';

const { Title, Text } = Typography;

const PredictForm = () => {
  const [form] = Form.useForm();
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.prediction !== undefined) {
        setPrediction(result.prediction.toFixed(2)); // Làm tròn kết quả
        message.success('Dự đoán thành công!');
      } else {
        setPrediction('Dự đoán thất bại.');
        message.error('Dự đoán thất bại.');
      }
    } catch (error) {
      console.error('Error while fetching prediction:', error);
      setPrediction('Lỗi khi dự đoán.');
      message.error('Lỗi kết nối đến server.');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            Dự đoán giá trị Close
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              open: '',
              high: '',
              low: '',
              volume: '',
              quoteAssetVolume: '',
              numOfTrades: '',
              takerBuyBaseAssetVolume: '',
              takerBuyQuoteAssetVolume: '',
            }}
          >
            {[
              { name: 'open', label: 'Giá mở cửa (Open)' },
              { name: 'high', label: 'Giá cao nhất (High)' },
              { name: 'low', label: 'Giá thấp nhất (Low)' },
              { name: 'volume', label: 'Khối lượng giao dịch (Volume)' },
              { name: 'quoteAssetVolume', label: 'Khối lượng tài sản (Quote Asset Volume)' },
              { name: 'numOfTrades', label: 'Số giao dịch (Number of Trades)' },
              { name: 'takerBuyBaseAssetVolume', label: 'Khối lượng mua cơ sở (Taker Buy Base Asset Volume)' },
              { name: 'takerBuyQuoteAssetVolume', label: 'Khối lượng mua báo giá (Taker Buy Quote Asset Volume)' },
            ].map(({ name, label }) => (
              <Form.Item
                key={name}
                name={name}
                label={label}
                rules={[{ required: true, message: `Vui lòng nhập ${label.toLowerCase()}` }]}
              >
                <Input type="number" placeholder={`Nhập ${label.toLowerCase()}`} />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Dự đoán
              </Button>
            </Form.Item>
          </Form>
          {prediction !== null && (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Text strong>
                Giá trị của Bitcoin theo dự đoán: {isNaN(prediction) ? prediction : `${prediction} USD`}
              </Text>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default PredictForm;
