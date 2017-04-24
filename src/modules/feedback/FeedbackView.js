import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Text, Toast } from 'native-base';

import { connect } from 'react-redux';
import rest from '../../utils/rest';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  sendFeedback: feedback => dispatch(rest.actions.feedback.post({}, {
    body: JSON.stringify({ text: feedback }),
  })),
});

@connect(mapStateToProps, mapDispatchToProps)
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

  state = {
    feedback: '',
  };

  onChangeText = (feedback) => {
    this.setState({ feedback });
  }

  onButtonPress = () => {
    /* ToDo:
      Add call to Toast function or something similar
    */
    this.props.sendFeedback(this.state.feedback);
  }

  showToast = () => Toast.show({
    text: 'Thank you for your feedback!',
    position: 'center',
    duration: 3000,
    buttonText: 'OK',
  });

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Drop in suggestions about the app. We appreciate your feedback.</Text>
          <Form>
            <Item>
              <Input
                type="text" placeholder="Your message..." value={this.state.feedback}
                onChangeText={this.onChangeText}
              />
            </Item>
          </Form>
        </Content>
        <Button
          onPress={this.onButtonPress}
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
