import React from 'react';
import {useHistory} from 'react-router-dom';
import {message} from "antd";

const AdminPage = ({user}) => {
  const history = useHistory();

  if (!user.isAdmin) {
    history.push('/login');
    message.error('Access Denied');
  }

  return (
    <div>
      admin page
    </div>
  );
};

export default AdminPage;
