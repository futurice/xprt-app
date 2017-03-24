import React, { Component } from 'react';
import { Body, Left, Right, Thumbnail, Content, Container, ListItem, Text, Icon, List } from 'native-base';

import pepperoniIcon from '../../../images/pepperoni.png';

class LecturesView extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-list" style={{ color }} />
      ),
      visible: true,
    }),
  };

  componentDidMount() {
    this.props.getLectures();
  }

  open = (lectureId) => {
    this.props.navigate({
      routeName: 'LectureDetails',
      params: {
        lectureId,
      },
    });
  };

  renderRow = lecture => (
    <ListItem button onPress={() => this.open(lecture.id)} avatar key={lecture.id}>
      <Left>
        <Thumbnail source={pepperoniIcon} />
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

    );
  render() {
    const { lectures } = this.props;

    return (
      <Container>
        <Content>
          <List dataArray={lectures} renderRow={this.renderRow} />
        </Content>
      </Container>

    );
  }
}

export default LecturesView;
