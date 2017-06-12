import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import BlockButton from '../../components/BlockButton';
import rest from '../../utils/rest';

const mapStateToProps = state => ({
  feedbackResponse: state.feedback.data,
});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  sendFeedback: (feedback, callback) => dispatch(rest.actions.feedback.post({}, {
    body: JSON.stringify({ text: feedback, creatorType: 'teacher' }),
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
    const { back } = this.props;

    if (!this.state.feedback.length) {
      return Alert.alert(
        'Message cannot be empty!',
        'Please fill in some feedback text.',
      );
    }

    return this.props.sendFeedback(this.state.feedback, (err) => {
      if (err) {
        Alert.alert(
          'Error while sending feedback',
          JSON.stringify(err),
        );
      } else {
        Alert.alert(
          'Feedback',
          'Thank you for submitting feedback to XPRT.',
        );
        back();
      }
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Drop in suggestions about the app. We appreciate your feedback!</Text>
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
          <BlockButton
            onPress={this.onButtonPress}
            style={{ marginTop: 20 }}
            text="SUBMIT"
          />
        </Content>
      </Container>
    );
  }
}

export default FeedbackView;
