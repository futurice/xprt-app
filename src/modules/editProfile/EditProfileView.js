import React, { Component } from 'react';
import {
  Text,
  Image,
} from 'react-native';
import { Button, Container, Content, Icon, Input, Item, Label } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import styles from './EditProfileStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';
import icFeedbackGreen from '../../../images/icons/ic_feedback_green.png';


class EditProfileView extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
      ),
      visible: true,
    }),
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col>
                <Text style={styles.headlineStyle}> Personal: </Text>
              </Col>
              <Col style={styles.editPenAlignRight}>
                <Image source={icEditGreen} style={styles.iconEdit} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Name</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>E-mail</Label>
                  <Input />
                </Item>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Phone number</Label>
                  <Input />
                </Item>
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
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Name of school</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Subjects</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Educational stage</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row>
              <Button
                style={styles.feedbackButton} onPress={() => { this.open(); }}
                full
                transparent
              >
                <Image source={icFeedbackGreen} style={styles.iconFeedback} />
                <Text style={styles.labelStyle}>   SEND FEEDBACK </Text>
              </Button>
            </Row>
          </Grid>
        </Content>
        <Button dark full>
          <Text style={styles.logoutButton}>SAVE CHANGES</Text>
        </Button>
      </Container>
    );
  }
}

export default EditProfileView;
