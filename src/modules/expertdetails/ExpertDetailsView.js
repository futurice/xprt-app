import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Body, Badge, Button, Container, Content, Icon, Spinner, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import BlockButton from '../../components/BlockButton';
import openUrl from '../../services/openUrl';
import rest from '../../utils/rest';
import { selectExpert } from '../lectureInvitation/LectureInvitationView';

import styles from './expertDetailStyles';

const mapStateToProps = (state, ownProps) => ({
  expert: state.expertDetails.data,
  loading: state.expertDetails.loading,
  expertId: ownProps.navigation.state.params.expertId,
  inviteLectureDisabled: ownProps.navigation.state.params.inviteLectureDisabled,
  invitationSelect: ownProps.navigation.state.params.invitationSelect,
  loggedIn: !!state.login.token,
});
const mapDispatchToProps = dispatch => ({
  getExpertDetails(expertId) {
    dispatch(rest.actions.expertDetails({ expertId }));
  },
  selectExpert(expert) {
    dispatch(selectExpert(expert));
  },
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ExpertDetailsView extends Component {
  static navigationOptions = {
    header: styles.headerStyle,
  };

  componentDidMount() {
    this.props.getExpertDetails(this.props.expertId);
  //  this.props.getExperts();
  }
  open = (expert) => {
    this.props.navigate({
      routeName: 'LectureInvitation',
      params: {
        expert,
      },
    });
  };
  handleSelect = (expert) => {
    this.props.selectExpert(expert);
    this.props.navigation.goBack(null);
    this.props.navigation.goBack(null);
  };
  // clearStack = (expert) => {
  //   this.props.navigation.dispatch({
  //     type: NavigationActions.NAVIGATE,
  //     routeName: 'LectureInvitation',
  //     params: {
  //       expert,
  //     },
  //     action: {
  //       type: NavigationActions.RESET,
  //       index: 0,
  //       actions: [{ type: NavigationActions.NAVIGATE, routeName: 'LectureInvitation' }],
  //     },
  //   });
  // };

  render() {
    const { expert, loading, inviteLectureDisabled, loggedIn, invitationSelect } = this.props;
    const subjects = expert.subjects || [];
    const areas = expert.area || [];

    let button = null;
    if (inviteLectureDisabled || !loggedIn) {
      button = null;
    } else if (invitationSelect) {
      button = (
        <BlockButton
          text="Select expert"
          onPress={() => this.handleSelect(expert)}
        />
      );
    } else {
      button = (
        <BlockButton
          text="Send lecture invitation"
          key={expert.id}
          onPress={() => { this.open(expert); }}
        />
      );
    }

    return (loading ? (
      <Container>
        <Content>
          <Spinner color={styles.spinner.color} />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col style={styles.profileGridCol}>
                <Button
                  transparent style={styles.iconButton}
                  warning onPress={() => { openUrl(`mailto: ${expert.email}?subject=DISSUBJECT&body=DISBODY`); }}
                >
                  <Icon name="mail" />
                </Button>
              </Col>
              <Col style={styles.profileGridCol}>
                <Thumbnail style={styles.avatarLarge} source={{ uri: expert.imageUrl }} />
              </Col>
              <Col style={styles.profileGridCol}>
                <Button
                  transparent style={styles.iconButton}
                  warning onPress={() => { openUrl(`tel: ${expert.phone}`); }}
                >
                  <Icon name="call" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Body>
                <Text style={styles.name}> {expert.name} </Text>
                <Text style={styles.lightText}> {expert.title} </Text>
                <View style={styles.visitRow}>
                  <Text style={styles.subjectText}> Visit possible: </Text>
                  {
                    areas.map(area => (
                      <Text style={styles.subjectText} key={area}> {area} </Text>
                    ))
                  }
                </View>
                <View style={styles.labelRowflow}>
                  {
                    subjects.map(subject => (
                      <Badge style={styles.subjectBadge} key={subject}>
                        <Text style={styles.subjectText}> {subject} </Text>
                      </Badge>
                    ))
                  }
                </View>
              </Body>
            </Row>
          </Grid>
          <Grid style={styles.aboutGrid}>
            <Row>
              <Text style={styles.aboutText}>About {expert.name}:</Text>
            </Row>
            <Row>
              <Text style={styles.description} note>{expert.description}</Text>
            </Row>
          </Grid>
        </Content>
        {button}
      </Container>
    ));
  }
}
