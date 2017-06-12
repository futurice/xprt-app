import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { Container, Footer, FooterTab, Content, Button, Text, Spinner, Thumbnail, Icon, Badge, View } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import BlockButton from '../../components/BlockButton';
import rest from '../../utils/rest';
import styles from './LectureDetailStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';

const mapStateToProps = (state, ownProps) => ({
  lecture: state.lectureDetails.data,
  loading: state.lectureDetails.loading,
  lectureId: ownProps.navigation.state.params.lectureId,
});
const mapDispatchToProps = dispatch => ({
  getLectures: () => dispatch(rest.actions.lectures()),
  getLectureDetails: lectureId => dispatch(rest.actions.lectureDetails({ lectureId })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  cancelInvitation: (lectureId, callback) => dispatch(rest.actions.lectureDetails.patch({ lectureId }, {
    body: JSON.stringify({ status: 'declined' }),
  }, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LectureDetailsView extends Component {
  static navigationOptions = {
    title: 'Lecture Details',
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
  state = {
    status: 'declined',
  }

  componentDidMount() {
    this.props.getLectureDetails(this.props.lectureId);
  }

  open = (expertId) => {
    this.props.navigate({
      routeName: 'ExpertDetails',
      params: {
        expertId,
        inviteLectureDisabled: true,
      },
    });
  };

  render() {
    const { lecture, loading } = this.props;
    const uri = lecture.expertImageUrl;

    return (loading || !lecture.title ? (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigate({
                  routeName: 'ExpertDetails',
                  params: {
                    expertId: lecture.expertId,
                    inviteLectureDisabled: true,
                  },
                });
              }}
            >
              <Row style={styles.rowBorder}>
                <Col size={25}>
                  <Thumbnail style={styles.avatarMedium} source={{ uri }} />
                </Col>
                <Col size={65}>
                  <Text style={styles.boldText}>{lecture.expertName}</Text>
                  <Text style={styles.titleStyle}>{lecture.expertTitle}</Text>
                  <View style={styles.rowFlow}>
                    <Icon name="pin" style={styles.iconStyle} />
                    { lecture.expertArea && lecture.expertArea.map(location => (
                      <Text style={styles.locationText} key={location}> {location} </Text>
                    ))
                    }
                  </View>
                </Col>
                <Col size={10}>
                  <Icon name="arrow-forward" />
                </Col>
              </Row>
            </TouchableOpacity>
            <Row style={styles.rowBorder}>
              <Col>
                <Text style={styles.labelStyle}>Lecture status:</Text>
                <Badge style={styles[lecture.status]}>
                  <Text style={{ fontSize: 10 }}>{lecture.status.toUpperCase()}</Text>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col size={5}>
                <Text style={styles.labelStyle}>Lecture title</Text>
                <Text>{lecture.title}</Text>
                <Text style={styles.labelStyle}>Date</Text>
                <Text>{new Date(lecture.dateOption1).toLocaleDateString('fi-FI')}</Text>
                <Text style={styles.labelStyle}>Location</Text>
                <Text>{lecture.location}</Text>
                <Text style={styles.labelStyle}>Short lecture description</Text>
                <Text>{lecture.description}</Text>
                <Text style={styles.labelStyle}>Subjects</Text>
                {lecture.subjects.map((subject, index) =>
                  <Text key={index}>
                    {subject}
                  </Text>,
                )}
              </Col>
              {lecture.status !== 'declined' &&
                <Col size={1} style={styles.editPenAlignRight}>
                  <Button
                    style={{ alignSelf: 'flex-end' }}
                    transparent
                    onPress={() => {
                      this.props.navigate({
                        routeName: 'EditLecture',
                        params: {
                          lecture,
                        },
                      });
                    }}
                  >
                    <Image source={icEditGreen} style={styles.iconEdit} />
                  </Button>
                </Col>
              }
            </Row>
          </Grid>
          {lecture.status !== 'declined' ?
            <BlockButton
              style={{ marginVertical: 20 }}
              text="CANCEL THE INVITATION" onPress={() => {
                Alert.alert(
                  'Lecture cancellation confirmation',
                  'Are you sure you want to cancel the lecture? Note that you cannot undo this action.',
                  [
                    { text: 'No', style: 'cancel' },
                    {
                      text: 'Yes',
                      onPress: () => {
                        this.props.cancelInvitation(lecture.id, () => {
                          this.props.getLectures();
                        });
                      },
                    },
                  ],
                );
              }}
            />
          : null}
        </Content>
      </Container>
    ));
  }
}
