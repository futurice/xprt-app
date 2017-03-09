import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';

import {Container, Content, ListItem, List, Left, Body, Right, Thumbnail} from 'native-base';

class ExpertsView extends Component {
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
  renderRow(rowData, sectionID) {
    return (
      <ListItem roundAvatar>
        <Left>
          <Thumbnail source={require('../../../images/pepperoni.png')}/>
        </Left>
        <Body>
          <Text> {rowData.name} </Text>
          <Text note> body note </Text>
        </Body>
        <Right>
          <Text note> Side node </Text>
        </Right>
      </ListItem>
    );
  }

  changeFilter(e) {
    console.log(e);
  }

  render() {
    let expertItems = this.props.experts;

    return (
      <Container>
        <Content>
          <List dataArray={expertItems} renderRow={this.renderRow}/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
});

export default ExpertsView;
