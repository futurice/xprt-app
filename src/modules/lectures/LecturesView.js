import React, {PropTypes, Component} from 'react';
import {
  View,
  ListView,
  StyleSheet
} from 'react-native';

import {Body, Left, Right, Thumbnail, Content, Container, ListItem, Text, Icon} from 'native-base';

class LecturesView extends Component {
  componentDidMount() {
    console.log('Hello');
    this.props.getLectures();
  }

  open = (lectureId) => {
    this.props.navigate({
      routeName: 'LectureDetails',
      params: {
        lectureId
      }
    });
  };

  render() {
    return (
      <Container>
        <Content>
          {
            this.props.lectures.map((lecture) => (
              <ListItem button onPress={() => this.open(lecture.id)} avatar key={lecture.id}>
                <Left>
                  <Thumbnail source={require('../../../images/pepperoni.png')} />
                </Left>
                <Body>
                  <Text>{lecture.title}</Text>
                  <Text note>Example Character</Text>
                  <Text note>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))
          }
        </Content>
      </Container>

    );
  }
};

export default LecturesView;
