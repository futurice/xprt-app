import React, { Component } from 'react';
import { Body, Left, Right, Thumbnail, Content, Container, ListItem, Text, Icon, List, Badge, View} from 'native-base';
import styles from './lectureStyles';

import placeHolder from '../../../images/ic_unknownxxhdpi.png';

const status = ['accepted', 'completed', 'invitation', 'blank'];
const warning = 'warning';

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
        <Thumbnail source={placeHolder} />
      </Left>
      <Body>
        <Text>{lecture.title}</Text>
        <Text note>Example Character</Text>
        <Text note>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
        <Badge style={styles[status[2 * lecture.id % 4]]}>
          <Text style={{fontSize:10}}>{status[2 * lecture.id % 4]}</Text>
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
      </Container>

    );
  }
}

export default LecturesView;
