import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View
} from 'react-native';

import debounce from 'lodash/debounce';
import defaultProfile from '../../../images/icons/ic_person.png';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

import {Container, Content, Badge, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail, Spinner} from 'native-base';

class ExpertsView extends Component {
  componentDidMount() {
    this.props.getExperts();
  }
  static navigationOptions = {
    tabBar: () => ({
      icon: ({tintColor: color}) => (
        <Icon name="ios-person-outline" style={{color}}/>
      ),
      visible: true
    }),
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
      <Badge style={styleObject.subjectBadge}>
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
          <View style={{flexDirection: 'row'}}>
            <Icon name='navigate' style={{fontSize: 18}}/>
            {
              areas.map((area, index) => {
                return (
                  <Text note key={index}> {area} </Text>
                );
              })
            }
          </View>
          <View style={styles.subjectView}>
            {
              subjects.map((subject, index) => {
                return (
                  <Badge style={styleObject.subjectBadge} key={index}>
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

const styleObject = {
  subjectBadge: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 12,
    height: 20,
    margin: 3
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#640DE8'
  },
  content: {
    backgroundColor: '#640DE8'
  },
  subjectView: {
    flexDirection: 'row'
  },
  subjectText: {
    fontSize: 10,
    textAlign: 'justify'
  },
  rowText: {
    color: '#333333'
  },
  subtitleText: {
    marginRight: 7,
    color: 'white',
    backgroundColor: '#D8D8D8',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 7
  },
  tagsWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list: {
    flex: 1,
    marginTop: 0
  }
});

export default ExpertsView;
