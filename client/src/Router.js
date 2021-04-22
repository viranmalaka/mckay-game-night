import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import UserPage from "./components/user-page";
import AdminPage from "./components/admin-page";

const Router = ({user, setUser}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route path="/signup">
          <SignUp user={user} setUser={setUser}  />
        </Route>
        <Route path="/admin">
          <AdminPage user={user} setUser={setUser}  />
        </Route>
        <Route path="/user-dashboard">
          <UserPage user={user} setUser={setUser}  />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
