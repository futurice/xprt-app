import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import styles from './TeacherProfileStyles';

class TeacherProfile extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
      ),
      visible: true,
    }),
  };

  componentDidMount() {
    // ToDo: Get ID from authentication token etc.
    this.props.getTeacher(12490);
  }

  render() {
    const { teacher } = this.props;
    return (
      <Container>
        <Content>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col>
                <Text> { teacher.name } </Text>
              </Col>
            </Row>
            <Row>
              <Text> { teacher.email } </Text>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default TeacherProfile;
