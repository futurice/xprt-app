import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';


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
          <Text>Drop in suggestions about the app. We appreciate your feedback.</Text>
          <Form>
            <Item>
              <Input placeholder='Your message...' />
            </Item>
          </Form>
        </Content>
        <Button dark full>
          <Text>SUBMIT</Text>
        </Button>
      </Container>
    );
  }
}
