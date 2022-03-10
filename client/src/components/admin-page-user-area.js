import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, InputNumber, Tag } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const AdminPageUserArea = ({
  isOnline,
  name,
  messages,
  total,
  setSession,
  session,
  userId,
  globalNumber,
  triggerGlobalNumber,
}) => {
  const [selected, setSelected] = useState('1');

  const [changeNumber, setChangeNumber] = useState(0);

  // useEffect(() => {
  //   setChangeNumber(setNumber);
  // }, [setNumber]);
  //
  useEffect(() => {
    setChangeNumber(globalNumber);
  }, [triggerGlobalNumber]);

  const setTotalPoint = (value, userId) => {
    setSession({ ...session, points: { ...session.points, [userId]: value } });
  };
  return (
    <Col span={12}>
      <div className="user-area d-flex">
        <div className="names">
          <div className="name">
            <Badge status={isOnline ? 'success' : 'warning'} />
            {name}
          </div>
          <div className="points">
            <InputNumber
              value={changeNumber}
              onChange={setChangeNumber}
              controls
              style={{ maxWidth: 50, marginRight: 5 }}
              min={0}
            />
            <Button
              icon={<PlusCircleOutlined />}
              size="small"
              onClick={() => setTotalPoint((total || 0) + changeNumber, userId)}
            />
            <Button
              icon={<MinusCircleOutlined />}
              size="small"
              onClick={() => setTotalPoint((total || 0) - changeNumber, userId)}
            />
          </div>
        </div>
        <div className="total">{total}</div>
        <div className="message">
          {messages.map(({ message, time }) => (
            <div className="message-box msg-list" key={time}>
              ({moment(time).format('HH:mm:ss')}) {message}
            </div>
          ))}
        </div>
        <div className="d-flex f-col btns">
          <div className={selected === '1' ? 'selected' : ''} onClick={() => setSelected('1')}>
            2X
          </div>
          <div className={selected === '2' ? 'selected' : ''} onClick={() => setSelected('2')}>
            SWAP
          </div>
          <div className={selected === '3' ? 'selected' : ''} onClick={() => setSelected('3')}>
            DECOY
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AdminPageUserArea;
