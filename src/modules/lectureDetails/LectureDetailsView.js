import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
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
  getLectureDetails: lectureId => dispatch(rest.actions.lectureDetails({ lectureId })),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
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
    const numb = Math.floor(Math.random() * 50);
    const uri = `https://randomuser.me/api/portraits/women/${numb}.jpg`;
    console.log(lecture);

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
            <TouchableOpacity onPress={() => { this.open(lecture.expertId); }}>
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
                <Text style={styles.labelStyle}>Theme of the lecture:</Text>
                <Text>{lecture.title}</Text>
                <Text style={styles.labelStyle}>Date of the lecture:</Text>
                <Text>{new Date(lecture.dateOption1).toLocaleDateString('fi-FI')}</Text>
                <Text style={styles.labelStyle}>Location:</Text>
                <Text>{lecture.location}</Text>
                <Text style={styles.labelStyle}>Short description of the lecture:</Text>
                <Text>{lecture.description}</Text>
              </Col>
              <Col size={1} style={styles.editPenAlignRight}>
                <Button
                  style={{ alignSelf: 'flex-end' }}
                  transparent
                  onPress={() => this.open('EditLecture')}
                >
                  <Image source={icEditGreen} style={styles.iconEdit} />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
        <BlockButton
          text="Cancel the invitation"
        />
      </Container>
    ));
  }
}
