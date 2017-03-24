import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';


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
        <Content>
          <Text>You have to be logged in to view and manage your profile and collaborations</Text>
          <Form>
            <Item floatingLabel>
              <Label>E-mail:</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password:</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Text>{"Don't have an account yet?"}</Text>
          <Button transparent success>
            <Text>CREATE AN ACCOUNT</Text>
          </Button>
        </Content>
        <Button dark full>
          <Text>LOG IN</Text>
        </Button>
      </Container>
    );
  }
}
