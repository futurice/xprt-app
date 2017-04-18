import React, { Component } from 'react';
import { Container, Text, Content, ListItem, Left, Thumbnail, Body, Form, Item, Label, Input, Button, CheckBox } from 'native-base';
import placeHolder from '../../../images/ic_unknownxxhdpi.png';
import styles from './lectureInvitationStyles';


class LectureInvitationView extends Component {
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
  render() {
    const { expert } = this.props;
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
          null}
          <Text note>Add some details about the lecture</Text>
          <Form>
            <Item floatingLabel last>
              <Label>Theme of the lecture:</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Date of lecture:</Label>
              <Input secureTextEntry />
            </Item>
            <Item floatingLabel last>
              <Label>Location:</Label>
              <Input secureTextEntry />
            </Item>
            <Item floatingLabel last>
              <Label>Short description of the lecture:</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Text note>The expert can contact me by:</Text>
          <ListItem>
            <CheckBox checked />
            <Body>
              <Text>By e-mail</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>By phone</Text>
            </Body>
          </ListItem>
        </Content>
        {expert ?
          <Button
            large block style={styles.blockButton}
          >
            <Text style={styles.blockButtonText}>SEND A LECTURE INVITATION</Text>
          </Button>
        :
          <Button
            large block style={styles.blockButton}
          >
            <Text style={styles.blockButtonText}>CREATE A LECTURE</Text>
          </Button>
        }
      </Container>
    );
  }

}
export default LectureInvitationView;
