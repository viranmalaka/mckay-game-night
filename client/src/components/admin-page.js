import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Input, InputNumber, Layout, Menu, message, Modal, Popover, Radio, Row, Tag, Tooltip } from 'antd';
import { nanoid } from 'nanoid';
import ScoreBoard from './score-board';
import API from '../common/api';
import SelectSession from './select-session';
import SocketClient from '../common/socket-client';
import moment from 'moment';
import AdminPageUserArea from './admin-page-user-area';
import { get } from '../common/utils';

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
  const [selectedImage, selectImage] = useState('none');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [globalNumber, setGlobalNumber] = useState(0);
  const [triggerGlobalNumber, setTriggerGlobalNumber] = useState(false);

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

  useEffect(() => {
    const ml = document.getElementById('message-list');
    const mls = document.getElementsByClassName('msg-list-to-scroll');

    for (let i = 0; i < mls.length; i++) {
      const m = mls[i];
      m.scrollTop = m.scrollHeight;
    }

    if (ml) {
      ml.scrollTop = ml.scrollHeight;
    }
  }, [session]);

  const [adminMessage, setAdminMessage] = useState('');

  const sessionMessages = {};
  const adminMessages = [];
  if (session) {
    session.messages.forEach((a) => {
      const data = {
        message: a.message,
        time: a.time,
      };
      if (a.isAdmin) {
        adminMessages.push(data);
      } else {
        const prev = sessionMessages[a.isAdmin ? 'admin' : a.username];
        if (prev) {
          prev.push(data);
        } else {
          sessionMessages[a.isAdmin ? 'admin' : a.username] = [data];
        }
      }
    });
  }

  const online = onlineUsers.reduce((p, c) => {
    p[c.username] = true;
    return p;
  }, {});

  const userObj = allUsers.reduce((p, c) => {
    p[c.username] = c;
    return p;
  }, {});

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
            <div>
              <Row>
                {Object.keys(sessionMessages).map((k) => (
                  <AdminPageUserArea
                    total={get(session, ['points', get(userObj, [k, '_id'])])}
                    userId={get(userObj, [k, '_id'])}
                    name={k}
                    key={k}
                    isOnline={online[k]}
                    messages={sessionMessages[k]}
                    session={session}
                    setSession={setSession}
                    triggerGlobalNumber={triggerGlobalNumber}
                    globalNumber={globalNumber}
                  />
                ))}
              </Row>
              <Row>
                <Col span={6}>
                  <InputNumber value={globalNumber} onChange={setGlobalNumber} />
                  <Button
                    onClick={() => {
                      setTriggerGlobalNumber(!triggerGlobalNumber);
                    }}
                  >
                    SET
                  </Button>
                </Col>
                <Col span={18} align="end">
                  <Radio.Group
                    onChange={(e) => {
                      selectImage(e.target.value);
                    }}
                    value={selectedImage}
                  >
                    <Radio value="none">None</Radio>
                    {Array(10)
                      .fill({})
                      .map((_, index) => (
                        <Popover
                          destroyTooltipOnHide
                          key={index}
                          content={() => <img width={300} src={`/questions/image-${index + 1}.jpeg?t=${Date.now()}`} />}
                        >
                          <Radio value={index + 1}>{index + 1}</Radio>
                        </Popover>
                      ))}
                  </Radio.Group>
                  <Button
                    onClick={() => {
                      ws.sendMessage(user, session.id, `code-image-${selectedImage}`);
                    }}
                  >
                    SEND IMAGE
                  </Button>
                </Col>
              </Row>
              <Col span={24} justify="space-between">
                <Row style={{ marginTop: 20 }}>
                  <Col span={20} style={{ height: 50, overflow: 'auto' }} className="msg-list msg-list-to-scroll">
                    {adminMessages.map((a) => (
                      <div className="message-box" key={a.time}>
                        ({moment(a.time).format('HH:mm:ss')}){' '}
                        {a.message.startsWith('code-image') ? '[IMAGE]' : a.message}
                      </div>
                    ))}
                  </Col>
                  <Col span={20}>
                    <Input value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} />
                  </Col>
                  <Col span={4}>
                    <Row>
                      <Col span={12}>
                        <Button
                          style={{ marginLeft: 5 }}
                          block
                          type="primary"
                          disabled={adminMessage === ''}
                          onClick={() => {
                            ws.sendMessage(user, session.id, adminMessage);
                            setAdminMessage('');
                          }}
                        >
                          SEND
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          style={{ marginLeft: 5 }}
                          block
                          onClick={() => {
                            ws.updatePoints(session.id, session.points);
                          }}
                        >
                          UPDATE
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }} />
      {!session && <SelectSession setSession={setSession} />}
    </Layout>
  );
};

export default AdminPage;
