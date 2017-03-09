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

  render() {
    return (
      <Container>
        <Content>
          {
            this.props.lectures.map((lecture) => (
              <ListItem button onPress={()=>console.log("HALOO" + Math.random())} avatar key={lecture.id}>
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
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'red'
  }
});

export default LecturesView;
