import React, { Component } from 'react';
import {
  RefreshControl,
} from 'react-native';

import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { Container, Content, Badge, Button, Header, Icon, Input,
  Item, Text, View, ListItem, List, Left, Body, Right, Thumbnail, Spinner } from 'native-base';
// import defaultProfile from '../../../images/icons/ic_person.png';
import styles from './expertsStyles';

import rest from '../../utils/rest';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

const mapStateToProps = state => ({
  experts: state.experts.data,
  loading: state.experts.loading,
});
const mapDispatchToProps = dispatch => ({
  getExperts: query => dispatch(rest.actions.experts({ filter: query })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ExpertsView extends Component {
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

    let areasStr = '';

    areas.forEach(area => (areasStr = `${areasStr} ${area}`));
    // const thumbnailSource = expert.imageUrl ? { uri: expert.imageUrl } : defaultProfile;
    // ToDo: Remove this thingy
    const numb = Math.floor(Math.random() * 50);

    return (
      <ListItem button avatar key={expert.id} onPress={() => { this.open(expert.id); }} >
        <Left>
          <Thumbnail source={{ uri: `https://randomuser.me/api/portraits/women/${numb}.jpg` }} />
        </Left>
        <Body>
          <Text numberOfLines={1}> {expert.name} </Text>
          <Text numberOfLines={1} note style={styles.rowText}> {expert.title || 'Title goes here'}</Text>
          <View style={styles.rowflow}>
            <Icon style={styles.areaIcon} name="pin" />
            <Text numberOfLines={1} note> {areasStr} </Text>
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
        <Right style={styles.arrowIcon}>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    const { experts, loading, getExperts } = this.props;

    return (
      <Container>
        <CustomHeader onSubmit={getExperts} />
        <View style={{flex: 1}}>
          <List
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getExperts}
              />
            }
            dataArray={experts}
            renderRow={this.renderRow}
          />
        </View>
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
