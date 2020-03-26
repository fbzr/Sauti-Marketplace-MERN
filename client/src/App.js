import React, { Fragment, useState, useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import SignUp from './components/SignUp';
import { CssBaseline } from '@material-ui/core';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Listings from './components/Listings';
import PriceList from './components/PriceList';
import Homepage from './components/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './muiTheme';
import setAuthorization from './utils/setAuthorization';

function App() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ 
    token: sessionStorage.getItem('token') || '',
    id: sessionStorage.getItem('id') || '' 
  });

  useEffect(() => {
    const { token, id } = credentials;
    setAuthorization(token, id);
    history.push('/');
  }, [credentials, history]);

  const handleLogin = (loginToken, loginUserId) => {
    setCredentials({
      token: loginToken,
      id: loginUserId
    });
  }

  const handleLogout = () => {
    setCredentials({
      token: '',
      id: ''
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <NavBar handleLogout={handleLogout} />
        <Switch>
          <Route exact path='/login'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path='/signup'>
            <SignUp handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/listings' component={Listings} userId={credentials.id} />
          <ProtectedRoute exact path='/prices' component={PriceList} />        
          <Redirect from='*' to='/' />
        </Switch>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;