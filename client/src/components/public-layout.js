import React from 'react';
import { Col, Row } from 'antd';

const PublicLayout = ({ children }) => {
  return (
    <Row>
      <Col span={6} offset={9} style={{ paddingTop: 150 }}>
        <h1 style={{ textAlign: 'center' }}>Welcome</h1>
        {children}
      </Col>
      <Col span={12} offset={6}>
        <img src="https://www.verywellmind.com/thmb/tLasK_y7eiz9cc5rt_Nv6n5ICtk=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/family-parents-grandparents-Morsa-Images-Taxi-56a906ad3df78cf772a2ef29.jpg" />
      </Col>
    </Row>
  );
};

export default PublicLayout;
