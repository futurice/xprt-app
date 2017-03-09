import React, {PropTypes, Component} from 'react';
import {
  View,
  ListView,
  StyleSheet
} from 'react-native';

import {Body, Left, Right, Thumbnail, Content, Container, ListItem, Text} from 'native-base';

class LecturesView extends Component {
  componentDidMount() {
    console.log('Hello');
    this.props.getLectures();
  }

  render() {
    return (
      <Container>
        <Content>
          {
            this.props.lectures.map((lecture) => (
              <ListItem avatar key={lecture.id}>
                <Left>
                  <Thumbnail source={require('../../../images/pepperoni.png')} />
                </Left>
                <Body>
                  <Text>{lecture.title}</Text>
                  <Text note>{lecture.dates}</Text>
                </Body>
                <Right>
                  <Text>></Text>
                </Right>
              </ListItem>
            ))
          }
        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'red'
  }
});

export default LecturesView;
