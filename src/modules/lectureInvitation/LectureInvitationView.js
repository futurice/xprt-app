import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Icon, Text, Content, ListItem, Left, Right, Thumbnail, Body, Form, Item, Label, Input, Button, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import { Col, Row } from 'react-native-easy-grid';

import SubjectsInput from '../../components/SubjectsInput';
import BlockButton from '../../components/BlockButton';
import rest from '../../utils/rest';
import styles from './lectureInvitationStyles';
import variables from '../../../native-base-theme/variables/platform';

export const SELECT_EXPERT = 'SELECT_EXPERT';
export const selectExpert = expert => ({ type: SELECT_EXPERT, payload: expert });
export const DESELECT_EXPERT = 'DESELECT_EXPERT';
export const deselectExpert = () => ({ type: DESELECT_EXPERT });

const initialState = { data: null };
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_EXPERT:
      return { ...state, data: action.payload };
    case DESELECT_EXPERT:
      return initialState;
    default:
      return state;
  }
};

const mapStateToProps = (state, ownProps) => ({
  teacher: state.teacherDetails.data,
  expert: ownProps.navigation.state.params.expert || state.selectedExpert.data,
  loading: state.expertDetails.loading,
  selectedExpert: state.selectedExpert.data,
  navExpert: ownProps.navigation.state.params.expert,
});
const mapDispatchToProps = dispatch => ({
  back: bindActionCreators(NavigationActions.back, dispatch),
  getLectures: () => dispatch(rest.actions.lectures()),
  getExperts: expertId => dispatch(rest.actions.expertDetails({ expertId })),
  createLecture: (lecture, callback) => dispatch(rest.actions.lectures.post({}, {
    body: JSON.stringify(lecture),
  }, callback)),
  deselectExpert() {
    dispatch(deselectExpert());
  },
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LectureInvitationView extends Component {
  static navigationOptions = {
    title: 'New lecture',
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

    this.state = {
      title: '',
      subjects: props.teacher.subjects || [],
      description: '',
      dateOption1: new Date().toISOString(),
      dateOption2: null,
      edStage: '',
      location: '',
      contactByEmail: true,
      contactByPhone: true,
    };
  }

  openSelectExpert = () => {
    this.props.navigate({
      routeName: 'ExpertsView',
      params: {
        invitationSelect: true,
      },
    });
  }
  handleDeselect = () => {
    this.props.deselectExpert();
  };
  render() {
    const { expert, createLecture, back, getLectures, selectedExpert, navExpert } = this.props;
    console.log(navExpert);
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
          {expert ?
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: expert.imageUrl }} />
              </Left>
              <Body>
                <Text>{expert.name}</Text>
                <Text note>CEO at Sportmart</Text>
                <Text note>Espoo</Text>
              </Body>
              {selectedExpert && !navExpert ?
                <Right>
                  <Button
                    dark
                    transparent
                    onPress={() => this.handleDeselect()}
                  >
                    <Icon name="close" />
                  </Button>
                </Right>
                : null
              }
            </ListItem>
          :
            <Button
              style={styles.selectExpertButton}
              large
              block
              onPress={() => this.openSelectExpert()}
            >
              <Text style={styles.selectExpertText}>Select expert</Text>
            </Button>
          }

          <Text style={{ paddingTop: 20 }} note>Add some details about the lecture</Text>
          <Form>
            <Item stackedLabel>
              <Label>Lecture title</Label>
              <Input
                value={title}
                onChangeText={text => this.setState({ title: text })}
              />
            </Item>
            <Row>
              <Col
                style={{
                  marginLeft: 16,
                  marginTop: 10,
                }}
              >
                <Label
                  style={{
                    fontSize: variables.inputFontSize - 2,
                  }}
                >
                  Date
                </Label>
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
                {/*
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
                */}
              </Col>
            </Row>
            <Item stackedLabel>
              <Label>Location:</Label>
              <Input
                value={location}
                onChangeText={text => this.setState({ location: text })}
              />
            </Item>
            <Item stackedLabel>
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
                    marginLeft: 16,
                    marginTop: 10,
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
            style={{ marginVertical: 20 }}
            text="Send lecture invitation"
            disabled={!expert}
            onPress={() => createLecture({
              ...this.state,
              expertId: expert.id,
            }, (err) => {
              if (err) {
                Alert.alert(
                  'Error while sending lecture invitation',
                  JSON.stringify(err),
                );
              } else {
                Alert.alert(
                  'Your invitation was sent successfully!',
                  'The expert will receive your invitation by e-mail and can contact you using the contact details provided.',
                );

                // Immediately refresh lectures list
                getLectures();

                // Leave the lecture invitation view
                back();
              }
            })}
          />
        </Content>
      </Container>
    );
  }
}
