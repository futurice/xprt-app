import React, { Component, PropTypes } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import styles from './ProfileStyles';

export default class LoginNag extends Component {
  static propTypes = {
    openLogin: PropTypes.func.isRequired,
    devLogin: PropTypes.func.isRequired,
  };

  render() {
    const { openLogin, devLogin } = this.props;

    return (
      <Container>
        <Content padder>
        </Content>
        { __DEV__ && devLogin && <Button style={styles.devLogin} full onPress={devLogin}>
          <Text style={styles.devLoginText}>DEVELOPER LOGIN</Text>
        </Button> }
        <Button style={styles.loginButton} full onPress={() => openLogin('Login')}>
          <Text style={styles.loginButtonText}>
            LOG IN WITH HUNDR
         </Text>
          <Text style={styles.loginButtonTextBold}>
            ED
         </Text>
        </Button>
      </Container>
    );
  }
}
