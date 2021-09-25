import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as classes from './App.modules.css';
import Layout from './containers/layout';
import Splash from './pages/splash';
import * as actions from './store';
import { message, notification } from 'antd';
import socket from './socket-config';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.ath.token);
  const id = useSelector(state => state.ath.id);
  // const currentUser = useSelector(state => state.usr.currentUser);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const cleanup = (e) => {
          e.preventDefault();
          const authData = JSON.parse(localStorage.getItem('authData'));
          if (authData) {
              dispatch(actions.userOnlineStatus(authData.token, { online: false }));
          }
          return e.returnValue = "Are you sure you want to close?";
      };
    
      window.addEventListener('beforeunload', cleanup);
      return () => {
        window.removeEventListener('beforeunload', cleanup);
      }
  });

  useEffect(() => {
      const authData = JSON.parse(localStorage.getItem('authData'));
      let token = null;
      let id = null;
      let expiryDate = null;

      if (authData) {
          token = authData.token;
          id = authData.id;
          expiryDate = authData.expiryDate;
          console.log(authData);
      
        dispatch(actions.autoLogin(token, id, expiryDate));
      } else {
          setIsLoading(false);
      }
  }, [dispatch]);


  useEffect(() => {
      if (token) {
        dispatch(actions.fetchCurrentUser(token))
          .then(result => {
            return dispatch(actions.fetchProfile(token, id));
          })
          .then(result => {
            return dispatch(actions.fetchSetting(token));
          })
          .then(result => {
            return dispatch(actions.userOnlineStatus(token, { online: true }));
          })
          .then(result => {
            return dispatch(actions.fetchOnlineUsers(token));
          })
          .then(result => {
            setIsLoading(false);
            message.success('Welcome back');
          }).catch(err => {
            setIsLoading(false);
            if (err.response && err.response.data) {
              message.error(err.response.data.message);
            } else {
              message.error('App setup failed!');
            }
          });
      }
  }, [token, dispatch, id]);


  useEffect(() => {
    socket.on('join', ({ userName }) => {
        notification.open({
          message: userName + ' is online',
        });
    });

    socket.on('leave', ({ userName, room }) => {
        notification.open({
          message: userName + ' went offline',
        });
    });
  });

  return (
    <div className={classes.App}>
      {
        isLoading ?
          <Splash />
            :
          <Layout />
      }
    </div>
  );
}

export default App;
