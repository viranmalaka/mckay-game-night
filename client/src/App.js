import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import API from "./common/api";
import Router from "./Router";

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const userToken = localStorage.getItem('auth-token') || '';

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [err, data] = await API.get('users/validate', { token: userToken });
      if (err) {
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="App">
      <Router user={user} setUser={setUser} />
    </div>
  );
}

export default App;
