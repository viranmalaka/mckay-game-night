import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Spin, Tag } from 'antd';
import SocketClient from '../common/socket-client';
import ChooseSession from './choose-session';
import moment from 'moment';
import { get } from '../common/utils';

let ws = null;

const UserPage = ({ user }) => {
  const [totalPoints, setTotalpoints] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (user) {
      ws = SocketClient.getInstance();
      ws.connect(user, () => {
        console.log('websocket connected');
      });
      ws.addHook('user_message', (data) => {
        setSession({ ...session, messages: [...session.messages, data] });
      });
      ws.addHook('changed_points', (data) => {
        setSession({ ...session, points: data });
        setTotalpoints(data[user._id]);
      });
    }
  }, [user, session]);

  useEffect(() => {
    if (session) {
      setTotalpoints(get(session, ['points', user._id]));
    }
  }, [session]);

  if (!user) {
    return <Spin />;
  }
  if (!session) {
    return (
      <>
        <div>Select a Session</div>
        <ChooseSession setSession={setSession} />
      </>
    );
  }

  return (
    <>
      <Row style={{ marginTop: 100 }}>
        <Col span={6} offset={9}>
          <p style={{ textAlign: 'center' }}>Session ID: {session.id}</p>
        </Col>
        <Col span={6} offset={9}>
          <Input value={user.username} style={{ textAlign: 'center' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={6} offset={9}>
          <Input value={totalPoints} style={{ textAlign: 'center' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={12} offset={6}>
          <div style={{ minHeight: 200, maxHeight: '70vh', overflow: 'auto' }}>
            {session.messages
              .filter(({ username, isAdmin }) => isAdmin || username === user.username)
              .map(({ username, isAdmin, message, time }) => (
                <div key={time}>
                  <Tag color="default">{isAdmin ? 'Admin' : username}</Tag>: ({moment(time).format('HH:mm:ss')}){' '}
                  {message}
                </div>
              ))}
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={10} offset={6}>
          <Input value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
        </Col>
        <Col span={2}>
          <Button
            style={{ marginLeft: 5 }}
            type="primary"
            block
            disabled={userMessage === ''}
            onClick={() => {
              ws.sendMessage(user, session.id, userMessage);
              setUserMessage('');
            }}
          >
            SEND
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserPage;
