import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import debounce from 'lodash/debounce';

import { Container, Content, Badge, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail, Spinner } from 'native-base';

import defaultProfile from '../../../images/icons/ic_person.png';
import locationIcon from '../../../images/icons/ic_location_black.png';
import styles from './expertsStyles';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class ExpertsView extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-person-outline" style={{ color }} />
      ),
      visible: true,
    }),
  };

  componentDidMount() {
    this.props.getExperts();
  }

  open = (expertId) => {
    this.props.navigate({
      routeName: 'ExpertDetails',
      params: {
        expertId,
      },
    });
  };

  renderSubject = subject => (
    <Badge style={styles.subjectBadge}>
      <Text> {subject} </Text>
    </Badge>
    );

  renderRow = (expert) => {
    const subjects = expert.subjects || [];
    const areas = expert.area || [];
    const thumbnailSource = expert.imageUrl ? { uri: expert.imageUrl } : defaultProfile;

    // ToDo: Remove this thingy
    let numb = Math.floor(Math.random() * 50);

    return (
      <ListItem button avatar key={expert.id} onPress={() => { this.open(expert.id); }} >
        <Left>
          <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/women/' + numb + '.jpg'}} />
        </Left>
        <Body>
          <Text> {expert.name} </Text>
          <Text note style={styles.rowText}> {expert.title || 'Title goes here'}</Text>
          <View style={styles.rowflow}>
            <Image
              source={locationIcon}
              style={styles.navigateIcon}
            />
            {
              areas.map(area => (
                <Text note key={area}> {area} </Text>
              ))
            }
          </View>
          <View style={styles.rowflow}>
            {
              subjects.map((subject, index) => (
                // We don't have anything else to use as key, as subjects may not be unique
                // eslint-disable-next-line react/no-array-index-key
                <Badge style={styles.subjectBadge} key={index}>
                  <Text style={styles.subjectText}> {subject} </Text>
                </Badge>
              ))
            }
          </View>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    const { experts, loading, getExperts } = this.props;

    return (
      <Container>
        <Content>
          <CustomHeader onSubmit={getExperts} />

          { loading
            ? <Spinner />
            : <List dataArray={experts} renderRow={this.renderRow} />
          }
        </Content>
      </Container>
    );
  }
}

class CustomHeader extends Header {
  state = {
    text: '',
  };

  debouncedSubmit = debounce((text) => {
    const { onSubmit } = this.props;

    onSubmit(text);
  }, 300);

  onChangeText = (text) => {
    this.setState({ text });
    this.debouncedSubmit(text);
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="search" />
          <Input placeholder="Search for people, tags etc.." onChangeText={this.onChangeText} />
          <Icon active name="people" />
        </Item>
        <Button transparent onPress={() => onSubmit(this.state.text)}>
          <Text> Search </Text>
        </Button>
      </Header>
    );
  }
}

export default ExpertsView;
