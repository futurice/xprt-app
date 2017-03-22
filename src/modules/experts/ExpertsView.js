import React, {Component} from 'react';
import {
  Image,
  Text,
  View
} from 'react-native';

import debounce from 'lodash/debounce';
import defaultProfile from '../../../images/icons/ic_person.png';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

import {Container, Content, Badge, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail, Spinner} from 'native-base';
import styles from './expertsStyles';

class ExpertsView extends Component {
  componentDidMount() {
    this.props.getExperts();
  }
  static navigationOptions = {
    tabBar: () => ({
      icon: ({tintColor: color}) => (
        <Icon name='ios-person-outline' style={{color}}/>
      ),
      visible: true
    })
  };

  open = (expertId) => {
    this.props.navigate({
      routeName: 'ExpertDetails',
      params: {
        expertId
      }
    });
  };

  renderSubject = (subject) => {
    return (
      <Badge style={styles.subjectBadge}>
        <Text> {subject} </Text>
      </Badge>
    );
  };

  renderRow = (expert) => {
    let subjects = expert.subjects || [];
    let areas = expert.area || [];
    let thumbnailSource = expert.imageUrl ? {uri: expert.imageUrl} : defaultProfile;
    return (
      <ListItem button avatar key={expert.id} onPress={() => {this.open(expert.id);}} >
        <Left>
          <Thumbnail source={thumbnailSource} />
        </Left>
        <Body>
          <Text> {expert.name} </Text>
          <Text note style={styles.rowText}> {expert.title || 'Title goes here'}</Text>
          <View style={styles.rowflow}>
            <Image source={require('../../../images/icons/ic_location_black.png')}
              style={styles.navigateIcon}/>
            {
              areas.map((area, index) => {
                return (
                  <Text note key={index}> {area} </Text>
                );
              })
            }
          </View>
          <View style={styles.rowflow}>
            {
              subjects.map((subject, index) => {
                return (
                  <Badge style={styles.subjectBadge} key={index}>
                    <Text style={styles.subjectText}> {subject} </Text>
                  </Badge>
                );
              })
            }
          </View>
        </Body>
        <Right>
          <Icon name='arrow-forward'/>
        </Right>
      </ListItem>
    );
  }

  render() {
    const {experts, loading, getExperts} = this.props;

    return (
      <Container>
        <Content>
          <CustomHeader onSubmit={getExperts}/>

          { loading
            ? <Spinner />
            : <List dataArray={experts} renderRow={this.renderRow}/>
          }
        </Content>
      </Container>
    );
  }
}

class CustomHeader extends Header {
  state = {
    text: ''
  };

  debouncedSubmit = debounce((text) => {
    const {onSubmit} = this.props;

    onSubmit(text);
  }, 300);

  onChangeText = (text) => {
    this.setState({text});
    this.debouncedSubmit(text);
  };

  render() {
    const {onSubmit} = this.props;

    return (
      <Header searchBar rounded>
        <Item>
          <Icon name='search' />
          <Input placeholder='Search for people, tags etc..' onChangeText={this.onChangeText} />
          <Icon active name='people' />
        </Item>
        <Button transparent onPress={() => onSubmit(this.state.text)}>
          <Text> Search </Text>
        </Button>
      </Header>
    );
  }
}

export default ExpertsView;
