import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Icon, Input, Item, Label } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import SubjectsInput from '../../components/SubjectsInput';
import BlockButton from '../../components/BlockButton';
import styles from './EditProfileStyles';
import rest from '../../utils/rest';

const mapStateToProps = state => ({
  teacher: state.profile.data,
});
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.profile()),
  saveChanges: (teacher, callback) => dispatch(rest.actions.profile.patch({}, {
    body: JSON.stringify(teacher),
  }, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
class EditProfileView extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="person" style={{ color }} />
      ),
      visible: true,
    }),
    header: () => ({
      style: {
        backgroundColor: '#333333',
      },
      titleStyle: {
        color: '#15a369',
      },
      tintColor: '#15a369',
    }),
    title: 'Edit school',
  };
  constructor(props) {
    super(props);

    const { teacher } = props;

    this.state = {
      company: teacher.company,
      address: teacher.address,
      subjects: teacher.subjects,
      edStage: teacher.edStage,
    };
  }
  state = {
    company: '',
    address: '',
    subjects: [],
    edStage: '',
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col>
                <Text style={styles.headlineStyle}>School: </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Name of school</Label>
                  <Input
                    onChangeText={company => this.setState({ company })}
                    value={this.state.company}
                  />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>School address</Label>
                  <Input
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                  />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label style={styles.labelStyle}>Subjects</Label>
                <SubjectsInput
                  values={this.state.subjects}
                  onChange={subjects => this.setState({ subjects })}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Item stackedLabel last>
                  <Label style={styles.labelStyle}>Educational stage</Label>
                  <Input
                    onChangeText={edStage => this.setState({ edStage })}
                    value={this.state.edStage}
                  />
                </Item>
              </Col>
            </Row>
          </Grid>
          <BlockButton
            style={{ marginVertical: 20 }}
            text="SAVE CHANGES" onPress={() => this.props.saveChanges(this.state, () => {
              this.props.navigation.goBack();
              this.props.refresh();
            })}
          />
        </Content>
      </Container>
    );
  }
}

export default EditProfileView;
