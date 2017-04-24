import React, { Component } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import styles from './ProfileStyles';

export default class MyProfile extends Component {
  render() {
    const { text, openLogin } = this.props;

    return (
      <Container>
        <Content padder>
          <Text>{ text }</Text>
          <Button dark full onPress={() => openLogin('Login')}>
            <Text style={styles.logoutButton}>LOG IN</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
