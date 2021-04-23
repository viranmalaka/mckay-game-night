import React, {useState, useEffect} from 'react';
import moment from "moment";
import {to} from "../common/utils";
import API from "../common/api";
import {Input, Table, message, Modal} from "antd";

const SelectSession = ({setSession}) => {
  const [modal, showModal] = useState(true);
  const token = localStorage.getItem('auth-token');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    (async () => {
      const [err, data] = await API.get('session', {token});
      if (err) {
        return message.error(err.msg || err.error.msg || 'Something Went Wrong');
      }
      setSessions(data.sessions);
    })();
  }, []);

  return <>
    <Modal title="Create A New Game" visible={modal} onOk={() => showModal(false)} onCancel={() => showModal(false)}>
      <Table
        dataSource={sessions}
        columns={[
          {
            title: 'Started At',
            dataIndex: 'createdAt',
            render: (value) => moment(value).format('YYYY-MM-DD  HH:mm A')
          }, {
            title: 'ID',
            dataIndex: 'id',
          }]}
        pagination={{position: ['none', 'none']}}
        rowKey="_id"
        onRow={(record) => ({
            onClick: async () => {
              const [err, data] = await API.get('session/' + record._id, {token});
              if(err) {
                return message.error('Something went wrong');
              }
              setSession(data.session);
              showModal(false);
            },
          })}
      />
    </Modal>
  </>
};

export default SelectSession;