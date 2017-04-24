import React, { Component } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import styles from './ProfileStyles';

export default class LoginNag extends Component {
  render() {
    const { text, openLogin, devLogin } = this.props;

    return (
      <Container>
        <Content padder>
          <Text>{ text }</Text>
          <Button dark full onPress={() => openLogin('Login')}>
            <Text style={styles.logoutButton}>LOG IN</Text>
          </Button>

          { __DEV__ && devLogin && <Button dark full onPress={devLogin}>
            <Text style={styles.logoutButton}>DEVELOPER LOGIN</Text>
          </Button> }
        </Content>
      </Container>
    );
  }
}
