import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Input, Layout, Menu, message, Modal, Row, Tag } from 'antd';
import { nanoid } from 'nanoid';
import ScoreBoard from './score-board';
import API from '../common/api';
import SelectSession from './select-session';
import SocketClient from '../common/socket-client';
import moment from 'moment';

const { Header, Content, Footer } = Layout;

let ws = null;

const CreateNewGame = ({ session, setSession, onLogout }) => {
  const [modal, showModal] = useState(false);
  const [gameKey, setGameKey] = useState(nanoid(6));
  const token = localStorage.getItem('auth-token');

  const handleCreateNewGame = async () => {
    const [err, data] = await API.post('session', { id: gameKey }, { token });
    if (err) {
      return message.error(err.msg || err.error.msg || 'Something Went Wrong');
    }
    message.success(`Game Create with Game ID: ${gameKey}`);
    message.info('Please share this game ID with others to join');
    setSession(data.newSession);
    showModal(false);
  };

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[]} selectable={false}>
      <Menu.Item key={1} onClick={() => showModal(true)}>
        Create A New Game
      </Menu.Item>
      <Menu.Item style={{ float: 'right' }} key={3} onClick={onLogout}>
        Logout
      </Menu.Item>
      <Menu.Item style={{ float: 'right' }} key={2}>
        key: {(session && session.id) || 'N/A'}
      </Menu.Item>
      <Modal title="Create A New Game" visible={modal} onOk={handleCreateNewGame} onCancel={() => showModal(false)}>
        <Input value={gameKey} onChange={(e) => setGameKey(e.target.value)} />
      </Modal>
    </Menu>
  );
};

const AdminPage = ({ user, setUser }) => {
  const token = localStorage.getItem('auth-token');
  const history = useHistory();
  const [session, setSession] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  if (user && !user.isAdmin) {
    history.push('/');
    message.error('Access Denied');
    setUser(null);
  }

  useEffect(() => {
    if (user) {
      ws = SocketClient.getInstance();
      ws.connect(user, () => {
        console.log('websocket connected');
      });
      ws.addHook('user_message', (data) => {
        setSession({ ...session, messages: [...session.messages, data] });
      });
      ws.addHook('user_changed', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user, session]);

  useEffect(() => {
    (async () => {
      const [err, data] = await API.get('users/all-users', { token });
      if (err) {
        return message.error('Something went wrong, please refresh the page');
      }
      setAllUsers(data.users);
    })();
  }, []);

  const [adminMessage, setAdminMessage] = useState('');

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <CreateNewGame
          setSession={setSession}
          session={session}
          onLogout={() => {
            history.push('/');
            localStorage.setItem('auth-token', '');
            setUser(null);
          }}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {session && (
            <Row>
              <Col span={20} offset={2}>
                <Row>
                  <Col span={17}>
                    <div style={{ minHeight: 500, maxHeight: '70vh', overflow: 'auto' }}>
                      {session.messages.map(({ username, isAdmin, message, time }) => (
                        <div key={time}>
                          <Tag color="default">{isAdmin ? 'Admin' : username}</Tag>: ({moment(time).format('HH:mm:ss')}){' '}
                          {message}
                        </div>
                      ))}
                    </div>
                    <Row style={{ marginTop: 20 }}>
                      <Col span={20}>
                        <Input value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} />
                      </Col>
                      <Col span={4}>
                        <Button
                          style={{ marginLeft: 5 }}
                          type="primary"
                          block
                          disabled={adminMessage === ''}
                          onClick={() => {
                            ws.sendMessage(user, session.id, adminMessage);
                            setAdminMessage('');
                          }}
                        >
                          SEND
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6} offset={1}>
                    <ScoreBoard
                      onlineUsers={onlineUsers}
                      session={session}
                      setSession={setSession}
                      allUsers={allUsers}
                      onScoreUpdate={() => {
                        ws.updatePoints(session.id, session.points);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }} />
      {!session && <SelectSession setSession={setSession} />}
    </Layout>
  );
};

export default AdminPage;
