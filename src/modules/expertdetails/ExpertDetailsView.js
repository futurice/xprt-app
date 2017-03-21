import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import {Body, Card, CardItem, Container, Content, Icon, Left, Right, Spinner, Thumbnail} from 'native-base';
import defaultProfile from '../../../images/icons/ic_person.png';

class ExpertDetailsView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getExpertDetails(this.props.expertId);
  }

  render() {
    const {expert, loading} = this.props;
    let thumbnailSource = expert.imageUrl ? {uri: expert.imageUrl} : defaultProfile;

    return ( loading ? (
      <Container>
        <Content>
          <Spinner color={styles.spinner.color}/>
        </Content>
      </Container>
    ) : (
      <Container>
        <View style={styles.expertPage}>
          <View style={styles.expertPhoto}>
            <Left>
              <Icon name='pizza' />
            </Left>
            <Body>
              <Thumbnail large source={thumbnailSource} />
            </Body>
            <Right>
              <Icon name='beer' />
            </Right>
          </View>
          <View style={styles.expertBasicInfo}>
            <Text> {expert.name} </Text>
            <Text> {expert.title} </Text>
            <Text> {expert.area} </Text>
          </View>
          <View style={styles.expertAbout}>
            <Text> {expert.description} </Text>
          </View>
        </View>
      </Container>
    ));
  }
}

const styles = StyleSheet.create({
  spinner: {
    color: 'green'
  },
  expertPage: {
    flex: 1
  },
  expertPhoto: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  expertBasicInfo: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center'
  },
  expertAbout: {
    flex: 3,
    backgroundColor: 'powderblue',
    alignItems: 'center'
  }
});

export default ExpertDetailsView;
