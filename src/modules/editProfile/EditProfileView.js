import React, { Component } from 'react';
import {
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Icon, Input, Item, Label } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import styles from './EditProfileStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';

const mapStateToProps = state => ({
  teacher: state.teacherDetails.data,
  teacherId: state.login.decoded.id,
});
// const mapDispatchToProps = dispatch => ({
//
// });

@connect(mapStateToProps)


class EditProfileView extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
      ),
      visible: true,
    }),
    title: 'Edit school'
  };
  state={ title: '' };
  saveChanges = () => {
    console.log(this.state);
  }

  render() {
    const { teacher } = this.props;

    return (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col>
                <Text style={styles.headlineStyle}> School: </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Name of school</Label>
                  <Input onChangeText={title => this.setState({ title })} defaultValue={`${teacher.title}`} />
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
          </Grid>
        </Content>
        <Button dark full onPress={() => this.saveChanges()}>
          <Text style={styles.logoutButton}>SAVE CHANGES</Text>
        </Button>
      </Container>
    );
  }
}

export default EditProfileView;
