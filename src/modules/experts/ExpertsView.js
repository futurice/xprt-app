import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';

import {SearchBar, List, ListItem} from 'native-base';

class ExpertsView extends Component {
  componentDidMount() {
    console.log('Hello');
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
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={
          <View style={styles.subtitleView}>
            <Text>{rowData.title}</Text>
            <Text>{rowData.area}</Text>
            <View style={styles.tagsWrapper}>
              {rowData.subjects.map((tag, index) => (
                <Text key={index} style={styles.subtitleText}>{tag}</Text>
              ))}
            </View>
          </View>
        }
        avatar={{uri: rowData.photograph}}
        />
    );
  }

  changeFilter(e) {
    console.log(e);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello {JSON.stringify(this.props.experts)} wolrd</Text>
      </View>
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
  }
});

export default ExpertsView;
