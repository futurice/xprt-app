import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { clearToken } from '../login/Login';

import styles from './ProfileStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';
import icFeedbackGreen from '../../../images/icons/ic_feedback_green.png';
import icMailBlack from '../../../images/icons/ic_mail_black.png';
import icPhoneBlack from '../../../images/icons/ic_phone_black.png';

const mapStateToProps = state => ({
  teacher: state.teacherDetails.data,
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
    const { teacher, logout } = this.props;

    return (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col>
                <Text style={styles.headlineStyle}> Personal: </Text>
              </Col>
              <Col style={styles.editPenAlignRight}>
                <TouchableHighlight onPress={() => { this.open('EditProfile'); }}>
                  <Image source={icEditGreen} style={styles.iconEdit} />
                </TouchableHighlight>
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
                <Image source={icEditGreen} style={styles.iconEdit} />
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
          </Grid>
        </Content>
        <Button full onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </Button>
      </Container>
    );
  }
}
