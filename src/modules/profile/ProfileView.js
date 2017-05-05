import React, { Component } from 'react';
import {
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { clearToken } from '../login/Login';
import openUrl from '../../services/openUrl';

import BlockButton from '../../components/BlockButton';

import styles from './ProfileStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';
import icFeedbackGreen from '../../../images/icons/ic_feedback_green.png';
import icMailBlack from '../../../images/icons/ic_mail_black.png';
import icPhoneBlack from '../../../images/icons/ic_phone_black.png';

const mapStateToProps = state => ({
  teacher: state.teacherDetails.data,
  loading: state.teacherDetails.loading,
  teacherId: state.login.decoded.id,
});
const mapDispatchToProps = dispatch => ({
  refresh: teacherId => dispatch(rest.actions.teacherDetails({ teacherId })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  logout: () => dispatch(clearToken()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MyProfile extends Component {
  componentDidMount() {
    const { refresh, teacherId } = this.props;
    refresh(teacherId);
  }

  open = (routeName) => {
    const { navigate } = this.props;
    navigate({ routeName });
  };

  render() {
    const { teacher, loading, refresh, logout } = this.props;

    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}
            />
          }
          style={styles.profileContainer}
        >
          <Grid>
            <Row>
              <Col>
                <Text style={styles.headlineStyle}> Personal: </Text>
              </Col>
              <Col style={styles.editPenAlignRight}>
                <Button
                  style={{ alignSelf: 'flex-end' }}
                  transparent
                  onPress={() => openUrl('https://auth.hundred.org/settings')}
                >
                  <Text>HundrED profile</Text>
                  <Image source={icEditGreen} style={styles.iconEdit} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.labelStyle}> Name: </Text>
                <Text> { teacher.name } </Text>
              </Col>
            </Row>
            <Row style={styles.rowBorder}>
              <Col>
                <Text style={styles.labelStyle}> Contact info: </Text>
                <Text style={styles.contactText}>
                  <Image source={icMailBlack} style={styles.iconMail} /> { teacher.email }
                </Text>
                <Text style={styles.contactText}>
                  <Image source={icPhoneBlack} style={styles.iconPhone} /> { teacher.phone }
                </Text>
              </Col>
            </Row>

            <Row>
              <Col>
                <Text style={styles.headlineStyle}> School: </Text>
              </Col>
              <Col style={styles.editPenAlignRight}>
                <Button
                  style={{ alignSelf: 'flex-end' }}
                  transparent
                  onPress={() => this.open('EditProfile')}
                >
                  <Image source={icEditGreen} style={styles.iconEdit} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.labelStyle}> Name of school: </Text>
                <Text> { teacher.name } </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.labelStyle}> Subjects: </Text>
                <Text> { teacher.name } </Text>
              </Col>
            </Row>
            <Row style={styles.rowBorder}>
              <Col>
                <Text style={styles.labelStyle}> Educational stage: </Text>
                <Text> { teacher.name } </Text>
              </Col>
            </Row>
            <Row>
              <Button
                style={styles.feedbackButton} onPress={() => { this.open('Feedback'); }}
                full
                transparent
              >
                <Image source={icFeedbackGreen} style={styles.iconFeedback} />
                <Text style={styles.labelStyle}>   SEND FEEDBACK </Text>
              </Button>
            </Row>
            <Row>
              <Col style={{ marginVertical: 10 }}>
                <BlockButton text="Log out" onPress={logout} />
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
