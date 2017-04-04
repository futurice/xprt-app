import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text, Icon, Right } from 'native-base';
import styles from './LoginStyles';

export default class FormExample extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-key-outline" style={{ color }} />
      ),
      visible: true,
    }),
  };

  render() {
    return (
      <Container>
        <Content padder={true}>
          <Text>You have to be logged in to view and manage your profile and collaborations</Text>
          <Form>
            <Item stackedLabel last>
              <Label style={styles.labelStyle}>E-mail:</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.labelStyle}>Password:</Label>
              <Input secureTextEntry/>
            </Item>
          </Form>

            <Text style={styles.center}>{"Don't have an account yet?"}</Text>

          <Button full transparent>
            <Text style={styles.labelStyle}>CREATE AN ACCOUNT</Text>
          </Button>
        </Content>
        <Button dark full>
          <Text style={styles.loginButton}>LOG IN</Text>
        </Button>
      </Container>
    );
  }
}
