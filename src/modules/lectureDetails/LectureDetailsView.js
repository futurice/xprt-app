import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Footer, FooterTab, Content, Button, Text, Spinner, Thumbnail, Icon } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import styles from './LectureDetailStyles';
import icEditGreen from '../../../images/icons/ic_edit_green.png';

class LectureDetailsView extends Component {
  static navigationOptions = {
    title: 'testi',
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

  render() {
    const { lecture, loading } = this.props;
    const numb = Math.floor(Math.random() * 50);
    const uri = `https://randomuser.me/api/portraits/women/${numb}.jpg`;

    return (loading ? (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content padder>
          <Grid style={styles.profileGrid}>
            <Row style={styles.rowBorder}>
              <Col size={25}>
                <Thumbnail style={styles.avatarMedium} source={{ uri }} />
              </Col>
              <Col size={65}>
                <Text style={styles.boldText}>Example Character</Text>
                <Text>CEO at Company</Text>
                <Text><Icon name="pin" />City</Text>
              </Col>
              <Col size={10}>
                <Icon name="arrow-forward" />
              </Col>
            </Row>
            <Row>
              <Col size={3}>
                <Text style={styles.headlineStyle}>Invite the expert to the lecture:</Text>
              </Col>
              <Col size={1} style={styles.editPenAlignRight}>
                <Image source={icEditGreen} style={styles.iconEdit} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={styles.labelStyle}>Theme of the lecture:</Text>
                <Text>{lecture.title}</Text>
                <Text style={styles.labelStyle}>Date of the lecture:</Text>
                <Text>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
                <Text style={styles.labelStyle}>Location:</Text>
                <Text>{lecture.area}</Text>
                <Text style={styles.labelStyle}>Short description of the lecture:</Text>
                <Text>{lecture.description}</Text>
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer>
          <FooterTab>
            <Button full dark>
              <Text>EDIT</Text>
            </Button>
            <Button full dark>
              <Text>INVITE AN EXPERT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    ));
  }
}

export default LectureDetailsView;
