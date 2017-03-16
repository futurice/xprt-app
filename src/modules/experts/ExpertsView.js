import React, {Component} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import debounce from 'lodash/debounce';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

import {Container, Content, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail, Spinner} from 'native-base';

class ExpertsView extends Component {
  constructor() {
    super();
    this.state = {query: ''};
  }
  componentDidMount() {
    this.props.getExperts();
  }

/*
  getInitialState() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.experts.data)
    });
  },
*/
  open = (expertId) => {
    this.props.navigate({
      routeName: 'ExpertDetails',
      params: {
        expertId
      }
    });
  };

  renderRow = (expert) => {
    return (
      <ListItem button avatar key={expert.id} onPress={() => {this.open(expert.id);
        console.log('Experts pressed: ', expert.id);}}>
        <Left>
          <Thumbnail source={require('../../../images/pepperoni.png')}/>
        </Left>
        <Body>
          <Text> {expert.name} </Text>
          <Text note style={styles.rowText}> {expert.email} </Text>
        </Body>
        <Right>
          <Icon name='arrow-forward'/>
        </Right>
      </ListItem>
    );
  }

  changeFilter(e) {
    console.log(e);
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
          <Input placeholder='Experts search' onChangeText={this.onChangeText} />
          <Icon active name='people' />
        </Item>
        <Button transparent onPress={() => onSubmit(this.state.text)}>
          <Text> Search </Text>
        </Button>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#640DE8'
  },
  content: {
    backgroundColor: '#640DE8'
  },
  rowText: {
    color: 'skyblue'
  },
  subtitleView: {
    paddingLeft: 10,
    paddingTop: 5
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
