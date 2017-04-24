import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Text, Content, ListItem, Left, Thumbnail, Body, Form, Item, Label, Input, Button, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import rest from '../../utils/rest';
import placeHolder from '../../../images/ic_unknownxxhdpi.png';
import styles from './lectureInvitationStyles';

const mapStateToProps = (state, ownProps) => ({
  expert: ownProps.navigation.state.params.expert,
  loading: state.expertDetails.loading,
});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  getExperts: expertId => dispatch(rest.actions.expertDetails({ expertId })),
  createLecture: (lecture, callback) => dispatch(rest.actions.lectures.post({}, {
    body: JSON.stringify(lecture),
  }, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LectureInvitationView extends Component {
  static navigationOptions = {
    title: 'Send a lecture invitation',
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
    title: '',
    description: '',
    dates: '',
    targetStudents: '',
    area: '',
    contactByEmail: true,
    contactByPhone: true,
  };

  render() {
    const { expert, createLecture, back } = this.props;

    const {
      title,
      description,
      dates,
      targetStudents,
      area,
      contactByEmail,
      contactByPhone,
    } = this.state;

    return (
      <Container>
        <Content padder>
          {expert ?
            <ListItem avatar>
              <Left>
                <Thumbnail source={placeHolder} />
              </Left>
              <Body>
                <Text>{expert.name}</Text>
                <Text note>CEO at Sportmart</Text>
                <Text note>Espoo</Text>
              </Body>
            </ListItem>
          :
            <Button large block>
              <Text>Select expert (TODO)</Text>
            </Button>
          }
          <Text note>Add some details about the lecture</Text>
          <Form>
            <Item floatingLabel last>
              <Label>Title of the lecture:</Label>
              <Input
                value={title}
                onChangeText={text => this.setState({ title: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Date of lecture:</Label>
              <Input
                value={dates}
                onChangeText={text => this.setState({ dates: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Location:</Label>
              <Input
                value={area}
                onChangeText={text => this.setState({ area: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Short description of the lecture:</Label>
              <Input
                value={description}
                onChangeText={text => this.setState({ description: text })}
              />
            </Item>
          </Form>
          <Text note>The expert can contact me by:</Text>
          <ListItem>
            <CheckBox
              checked={contactByEmail}
              onPress={() => this.setState({ contactByEmail: !contactByEmail })}
            />
            <Body>
              <Text>By e-mail</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              checked={contactByPhone}
              onPress={() => this.setState({ contactByPhone: !contactByPhone })}
            />
            <Body>
              <Text>By phone</Text>
            </Body>
          </ListItem>
        </Content>
        <Button
          large block style={styles.blockButton}
          onPress={() => createLecture({
            ...this.state,
            expertId: expert.id,
          }, (err) => {
            if (err) {
              Alert.alert(
                'Error while sending lecture invitation',
                JSON.stringify(err),
              );
            } else {
              Alert.alert(
                'Your invitation was sent successfully!',
                'The expert will receive your invitation by e-mail and can contact you using the contact details provided.',
              );
              back();
            }
          })}
        >
          <Text style={styles.blockButtonText}>SEND A LECTURE INVITATION</Text>
        </Button>
      </Container>
    );
  }
}
