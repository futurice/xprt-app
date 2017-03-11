import React, {Component} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import {Container, Content, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail} from 'native-base';

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
  renderRow(rowData) {
    return (
      <ListItem button avatar onPress={() =>
          console.log('ID of the person', rowData.id)}>
        <Left>
          <Thumbnail source={require('../../../images/pepperoni.png')}/>
        </Left>
        <Body>
          <Text> {rowData.name} </Text>
          <Text note style={styles.rowText}> {rowData.email} </Text>
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

  filterSearch = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    let expertItems = this.props.experts;

    return (
      <Container>
        <Content>
          <CustomHeader filterSearch={this.filterSearch}
            onSubmit={this.props.getExperts}/>
          <List dataArray={expertItems} renderRow={this.renderRow}/>
        </Content>
      </Container>
    );
  }
}

class CustomHeader extends Header {
  render() {
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name='search' />
          <Input placeholder='Experts search' onChangeText={text => this.setState({text})} />
          <Icon active name='people' />
        </Item>
        <Button transparent onPress={() => this.props.onSubmit(this.state.text)}>
          <Text> Search </Text>
        </Button>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
