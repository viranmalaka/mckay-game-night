import React, {useState} from 'react';
import {Row, Col, Input, Button, Spin} from "antd";

const UserPage = ({user}) => {

  const [totalPoints, setTotalpoints] = useState(0);
  const [adminMessage, setAdminMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')

  return user ? (
    <>
      <Row style={{marginTop: 100}}>
        <Col span={6} offset={9}>
          <Input value={user.username} style={{textAlign: 'center'}} />
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={6} offset={9}>
          <Input value={totalPoints} style={{textAlign: 'center'}} />
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={12} offset={6}>
          <Input.TextArea rows={10} value={adminMessage}/>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={10} offset={6}>
          <Input value={userMessage} onChange={e => setUserMessage(e.target.value)}/>
        </Col>
        <Col span={2}>
          <Button style={{marginLeft: 5}} type="primary" block disabled={userMessage === ''}>SEND</Button>
        </Col>
      </Row>
    </>
  ) : <Spin />;
};

export default UserPage;
