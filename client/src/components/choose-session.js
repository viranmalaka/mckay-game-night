import React, { useState } from 'react';
import API from '../common/api';
import { Input, message, Modal } from 'antd';

const ChooseSession = ({ setSession }) => {
  const [modal, showModal] = useState(true);
  const token = localStorage.getItem('auth-token');
  const [sessionId, setSessionId] = useState('');

  return (
    <>
      <Modal
        title="Enter a Session Code"
        visible={modal}
        onOk={async () => {
          const [err, data] = await API.get('session/' + sessionId, { token });
          if (err) {
            message.error('Something went wrong');
          } else {
            if (!data.session) {
              message.info('No found the Session. Please check and retry');
            } else {
              setSession(data.session);
              showModal(false);
            }
          }
        }}
        onCancel={() => showModal(true)}
      >
        <Input value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      </Modal>
    </>
  );
};

export default ChooseSession;
