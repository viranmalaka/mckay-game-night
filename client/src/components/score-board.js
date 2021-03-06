import React, { useState, useEffect } from 'react';
import { Button, Col, InputNumber, Row, Tag, Badge } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { get } from '../common/utils';

const ScoreLine = ({ username, totalPoint, userId, setTotalPoint, setNumber, isOnline }) => {
  const [changeNumber, setChangeNumber] = useState(0);

  useEffect(() => {
    setChangeNumber(setNumber);
  }, [setNumber]);

  return (
    <Row>
      <Col span={8} style={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
        <Badge status={isOnline ? 'success' : 'warning'}></Badge>
        {username}
      </Col>
      <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber
          style={{ maxWidth: 50, marginRight: 5 }}
          min={0}
          value={changeNumber}
          onChange={(e) => setChangeNumber(e)}
        />
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => setTotalPoint((totalPoint || 0) + changeNumber, userId)}
          size="small"
        />
        <Button
          icon={<MinusCircleOutlined />}
          onClick={() => setTotalPoint((totalPoint || 0) - changeNumber, userId)}
          size="small"
        />
        <Tag style={{ marginLeft: 5, marginRight: 0 }} color="volcano">
          {totalPoint || 0}
        </Tag>
      </Col>
    </Row>
  );
};

const ScoreBoard = ({ onlineUsers, session, setSession, allUsers, onScoreUpdate }) => {
  const [value, setValue] = useState(0);
  const [flushValue, setFlushValue] = useState(0);
  const onlineUsersObject = onlineUsers.reduce((p, c) => {
    p[c.username] = c;
    return p;
  }, {});

  return (
    <div>
      <Col style={{ display: 'flex', alignItems: 'center' }} span={16} offset={8}>
        <InputNumber style={{ maxWidth: 50, marginRight: 5 }} value={value} onChange={(e) => setValue(e)} min={0} />
        <Button
          size="small"
          onClick={() => {
            setFlushValue(value);
          }}
        >
          SET
        </Button>
      </Col>
      {allUsers
        .filter((ud) => !ud.isAdmin)
        .map((ud) => (
          <ScoreLine
            setNumber={flushValue}
            userId={ud._id}
            username={ud.username}
            isOnline={onlineUsersObject[ud.username]}
            totalPoint={get(session, ['points', ud._id])}
            setTotalPoint={(value, userId) => {
              setSession({ ...session, points: { ...session.points, [userId]: value } });
            }}
          />
        ))}
      <div style={{ marginTop: 10 }}>
        <Button type="primary" onClick={onScoreUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default ScoreBoard;
