import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import rest from '../../utils/rest';

const mapStateToProps = state => ({
  feedbackResponse: state.feedback.data,
});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  sendFeedback: (feedback, callback) => dispatch(rest.actions.feedback.post({}, {
    body: JSON.stringify({ text: feedback }),
  }, callback)),
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
    const { feedbackResponse, back } = this.props;

    this.props.sendFeedback(this.state.feedback, (err) => {
      if (err) {
        Alert.alert(
          'Error while sending feedback',
          JSON.stringify(err),
        );
      } else {
        Alert.alert(
          'Feedback',
          feedbackResponse.message,
        );
        back();
      }
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Drop in suggestions about the app. We appreciate your feedback.</Text>
          <Form>
            <Item>
              <Input
                multiline
                type="text" placeholder="Your message..." value={this.state.feedback}
                onChangeText={this.onChangeText}
                style={{ height: 150 }}
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
