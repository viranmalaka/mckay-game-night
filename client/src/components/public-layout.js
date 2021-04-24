import React from 'react';
import { Col, Row } from 'antd';

const PublicLayout = ({ children, title }) => {
  return (
    <Row>
      <Col span={6} offset={9} style={{ paddingTop: 150 }}>
        <h1 style={{ textAlign: 'center' }}>{title}</h1>
        {children}
      </Col>
      <Col span={12} offset={6}>
        <img src="/background.jpg" style={{ width: '100%' }} />
      </Col>
    </Row>
  );
};

export default PublicLayout;
