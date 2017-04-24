import React, { Component } from 'react';
import { Container, Text, ListItem, Left, Body, Right, Content, Thumbnail, Icon, Fab } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import rest from '../../utils/rest';
import placeHolder from '../../../images/ic_unknownxxhdpi.png';
import styles from './selectLectureStyles';

const mapStateToProps = (state, ownProps) => ({
  expert: state.expertDetails.data,
  loading: state.expertDetails.loading,
  expertId: ownProps.navigation.state.params.expertId,
});
const mapDispatchToProps = dispatch => ({
  getExperts: expertId => dispatch(rest.actions.expertDetails({ expertId })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SelectLectureView extends Component {
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
