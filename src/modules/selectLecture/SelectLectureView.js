import React, { Component } from 'react';
import { Container, Text, ListItem, Left, Body, Right, Content, Thumbnail, Icon, Fab } from 'native-base';
import placeHolder from '../../../images/ic_unknownxxhdpi.png';
import styles from './selectLectureStyles';


class SelectLectureView extends Component {
  static navigationOptions = {
    title: 'Select a lecture',
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
  open = (expert) => {
    this.props.navigate({
      routeName: 'LectureInvitation',
      params: {
        expert,
      },
    });
  };

  render() {
    const { expert } = this.props;

    return (
      <Container>
        <Content>
          <ListItem avatar>
            <Left>
              <Thumbnail source={placeHolder} />
            </Left>
            <Body>
              <Text>This is the placeholder lecture name</Text>
              <Text note>{expert.name}</Text>
              <Text note>10.10.1010</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
        <Fab
          position="bottomRight"
          style={styles.xprtGreen}
          key={expert.id}
          onPress={() => { this.open(expert); }}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }

}
export default SelectLectureView;
