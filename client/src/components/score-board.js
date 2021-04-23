import React, { useState } from 'react';
import { Button, Col, InputNumber, Row, Tag } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ScoreLine = ({ username, totalPoint, userId, setTotalPoint }) => {
  const [changeNumber, setChangeNumber] = useState(0);
  return (
    <Row>
      <Col span={8} style={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
        {username}
      </Col>
      <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber
          style={{ maxWidth: 50, marginRight: 5 }}
          min={0}
          value={changeNumber}
          onChange={(e) => setChangeNumber(e)}
        />
        <Button icon={<PlusCircleOutlined />} size="small" />
        <Button icon={<MinusCircleOutlined />} size="small" />
        <Tag style={{ marginLeft: 5, marginRight: 0 }} color="volcano">
          {totalPoint || 0}
        </Tag>
      </Col>
    </Row>
  );
};

const ScoreBoard = ({ onlineUsers, session, setSession }) => {
  return (
    <div>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={16} offset={8}>
        <InputNumber style={{ maxWidth: 50, marginRight: 5 }} min={0} />
        <Button size="small">SET</Button>
      </Col>
      {onlineUsers
        .filter((ud) => !ud.isAdmin)
        .map((ud) => (
          <ScoreLine
            {...ud}
            setTotalPoint={(value, userId) => {
              console.log(value, userId);
            }}
          />
        ))}
      <div style={{ marginTop: 10 }}>
        <Button type="primary">Update</Button>
      </div>
    </div>
  );
};

export default ScoreBoard;
