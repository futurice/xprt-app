import React, { Component } from 'react';
import forIn from 'lodash/forIn';
import { Alert } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Icon, Text, Content, ListItem, Left, Right, Thumbnail, Body, Form, Item, Label, Input, Button, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';

import SubjectsInput from '../../components/SubjectsInput';
import BlockButton from '../../components/BlockButton';
import rest from '../../utils/rest';
import variables from '../../../native-base-theme/variables/platform';

const mapStateToProps = (state, ownProps) => ({
  lecture: ownProps.navigation.state.params.lecture,
  loading: state.lectureDetails.loading,
});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  refreshLecture: lectureId => dispatch(rest.actions.lectureDetails(lectureId)),
  updateLecture: (lectureId, updatedFields, callback) => dispatch(rest.actions.lectureDetails.patch({
    lectureId,
  }, {
    body: JSON.stringify(updatedFields),
  }, callback)),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

const lectureProps = [
  'dateOption1',
  'dateOption2',
  'title',
  'location',
  'subjects',
  'description',
  'contactByEmail',
  'contactByPhone',
];

@connect(mapStateToProps, mapDispatchToProps)
export default class LectureInvitationView extends Component {
  static navigationOptions = {
    title: 'Edit lecture',
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

  constructor(props) {
    super(props);

    this.state = {};

    forIn(props.lecture, (value, key) => {
      if (lectureProps.includes(key)) {
        this.state[key] = value;
      }
    });
  }

  render() {
    const { updateLecture, back, refreshLecture, lecture } = this.props;

    const {
      title,
      description,
      dateOption1,
      dateOption2,
      location,
      contactByEmail,
      contactByPhone,
      subjects,
    } = this.state;

    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel last>
              <Label>Lecture title</Label>
              <Input
                value={title}
                onChangeText={text => this.setState({ title: text })}
              />
            </Item>
            <Row>
              <Col style={{
                  marginLeft: 16,
                  marginTop: 10,
              }}>
                <Label style={{
                  fontSize: variables.inputFontSize - 2,
                }}>Date</Label>

                <DatePicker
                  style={{width: '100%'}}
                  date={dateOption1}
                  mode="datetime"
                  placeholder="select date"
                  format="YYYY-MM-DD mm:ss"
                  minDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(dateOption1) => {this.setState({ dateOption1 })}}
                />
              </Col>
            </Row>
          { /*
            <Label>Date option 2 of lecture:</Label>
            <DatePicker
              style={{width: '100%'}}
              date={dateOption2}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD mm:ss"
              minDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(dateOption2) => {this.setState({ dateOption2 })}}
            />
            */ }
            <Item stackedLabel last>
              <Label>Location</Label>
              <Input
                value={location}
                onChangeText={text => this.setState({ location: text })}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Short lecture description</Label>
              <Input
                value={description}
                onChangeText={text => this.setState({ description: text })}
              />
            </Item>
            <Row>
              <Col>
                <Label
                  style={{
                    marginTop: 10,
                    marginLeft: 16,
                    fontSize: variables.inputFontSize - 2,
                  }}
                >
                  Subjects
                </Label>

                <SubjectsInput
                  values={subjects}
                  onChange={subjects => this.setState({ subjects })}
                />
              </Col>
            </Row>
          </Form>
          <Text style={{ paddingTop: 20 }} note>The expert can contact me by:</Text>
          <ListItem>
            <CheckBox
              checked={contactByEmail}
              onPress={() => this.setState({ contactByEmail: !contactByEmail })}
            />
            <Body>
              <Text>By e-mail</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginBottom: 20 }}>
            <CheckBox
              checked={contactByPhone}
              onPress={() => this.setState({ contactByPhone: !contactByPhone })}
            />
            <Body>
              <Text>By phone</Text>
            </Body>
          </ListItem>
          <BlockButton
            text="Save changes"
            style={{ marginVertical: 20 }}
            onPress={() => updateLecture(lecture.id, this.state, (err) => {
              if (err) {
                Alert.alert(
                  'Error while sending lecture invitation',
                  JSON.stringify(err),
                );
              } else {
                // Immediately refresh lectures list
                refreshLecture(lecture.id);

                // Leave the lecture editing
                back();
              }
            })}
          />
        </Content>
      </Container>
    );
  }
}
