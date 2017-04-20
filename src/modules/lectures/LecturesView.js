import React, { Component } from 'react';
import { Body, Left, Right, Thumbnail, Content, Container, ListItem, Text, Icon, List, Badge, Fab } from 'native-base';
import styles from './lectureStyles';

import placeHolder from '../../../images/ic_unknownxxhdpi.png';

const status = ['accepted', 'completed', 'invitation', 'blank'];

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

  open = (routeName, lectureId) => {
    this.props.navigate({
      routeName,
      params: {
        lectureId,
      },
    });
  };
  renderRow = lecture => (
    <ListItem button onPress={() => this.open('LectureDetails', lecture.id)} avatar key={lecture.id}>
      <Left>
        <Thumbnail source={placeHolder} />
      </Left>
      <Body>
        <Text>{lecture.title}</Text>
        <Text note>Example Character</Text>
        <Text note>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
        <Badge style={styles[status[lecture.id % 4]]}>
          <Text style={{ fontSize: 10 }}>{status[lecture.id % 4]}</Text>
        </Badge>
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
        <Fab
          position="bottomRight"
          style={styles.xprtGreen}
          onPress={() => this.open('LectureInvitation')}
        >
          <Icon name="add" />
        </Fab>
      </Container>

    );
  }
}

export default LecturesView;
