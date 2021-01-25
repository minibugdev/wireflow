import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Modal, Spin, Tooltip, Space } from 'antd/es';
import { UserOutlined, CloudSyncOutlined, LogoutOutlined } from '@ant-design/icons';

import 'antd/es/button/style/css';
import 'antd/es/modal/style/css';
import 'antd/es/spin/style/css';
import 'antd/es/tooltip/style/css';
import 'antd/es/space/style/css';

import './style.css';

const FlowUser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoadingIn] = useState(true);
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callback: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsLoadingIn(false);
      setIsSignedIn(!!user);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  });

  function showLogin() {
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  if (isLoading)
    return (
      <Spin className='user' size='large' />
    );
  else if (isSignedIn)
    return (
      <Space className='user'>
        <Button
          type='primary'
          shape='round'
          icon={<UserOutlined />}
        >Welcome {firebase.auth().currentUser.displayName}</Button>

        <Button
          type='dashed'
          shape='round'
          icon={<CloudSyncOutlined />}
          disabled
        >Sync to Cloud</Button>

        <Tooltip title="Sign Out">
          <Button
            type='dashed'
            shape='circle'
            icon={<LogoutOutlined />}
            onClick={() => firebase.auth().signOut()}
            danger
          />
        </Tooltip>
      </Space>
    );
  else return (
      <div>
        <Button
          className='user'
          type='primary'
          shape='round'
          icon={<UserOutlined />}
          onClick={showLogin}
        >Sign In</Button>
        <Modal title='Login' visible={isVisible} footer={null} onCancel={handleCancel}>
          <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()}
                              uiConfig={uiConfig}
                              firebaseAuth={firebase.auth()} />
        </Modal>
      </div>
    );
};

export default FlowUser;
