import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Text, Toast } from 'native-base';
import AppNavigator from '../navigator/Navigator';


class FeedbackView extends Component {
  static navigationOptions = {
    title: 'Feedback',
    header: () => ({
      style: {
        backgroundColor: '#333333',
      },
      titleStyle: {
        color: '#15a369',
      },
      tintColor: '#15a369',
    }),
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Drop in suggestions about the app. We appreciate your feedback.</Text>
          <Form>
            <Item>
              <Input placeholder="Your message..." />
            </Item>
          </Form>
        </Content>
        <Button
          onPress={()=> Toast.show({
              text: 'Thank you for your feedback!',
              position: 'center',
              duration: 3000,
              buttonText: 'OK',
            })}
            dark
            full
          >
          <Text style={{ color: '#f0ad4e' }}>SUBMIT</Text>
        </Button>
      </Container>
    );
  }
}

export default FeedbackView;
