import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { get } from '../common/utils';

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
  const [selected, setSelected] = useState({ a: false, b: false, c: false });

  const [changeNumber, setChangeNumber] = useState(0);
  const [inputColor, setInputColor] = useState('white');

  // useEffect(() => {
  //   setChangeNumber(setNumber);
  // }, [setNumber]);
  //
  useEffect(() => {
    setChangeNumber(globalNumber);
    setInputColor('white');
  }, [triggerGlobalNumber]);

  const setTotalPoint = (value, userId) => {
    setSession({ ...session, points: { ...session.points, [userId]: { value, selected, name } } });
  };

  useEffect(() => {
    setSession({
      ...session,
      points: { ...session.points, [userId]: { ...get(session, ['points', userId]), selected } },
    });
  }, [selected]);

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
              onClick={() => {
                setTotalPoint((total || 0) + changeNumber, userId);
                setInputColor('#00d000');
              }}
            />
            <Button
              icon={<MinusCircleOutlined />}
              size="small"
              onClick={() => {
                setTotalPoint((total || 0) - changeNumber, userId);
                setInputColor('#fd7777');
              }}
            />
          </div>
        </div>
        <div className="total" style={{ background: inputColor }}>
          {total}
        </div>
        <div className="message msg-list-to-scroll">
          {messages.map(({ message, time }) => (
            <div className="message-box" key={time}>
              ({moment(time).format('HH:mm:ss')}) {message}
            </div>
          ))}
        </div>
        <div className="d-flex f-col btns">
          <div className={selected.a ? 'selected' : ''} onClick={() => setSelected({ ...selected, a: !selected.a })}>
            2X
          </div>
          <div className={selected.b ? 'selected' : ''} onClick={() => setSelected({ ...selected, b: !selected.b })}>
            SWAP
          </div>
          <div className={selected.c ? 'selected' : ''} onClick={() => setSelected({ ...selected, c: !selected.c })}>
            DECOY
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AdminPageUserArea;
