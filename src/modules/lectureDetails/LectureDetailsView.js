import React, { Component } from 'react';
import { Container, Footer, FooterTab, Content, Button, Text, Spinner } from 'native-base';

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

    return (loading ? (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
          <Text note>Theme of the lecture:</Text>
          <Text>{lecture.title}</Text>
          <Text note>Date of the lecture:</Text>
          <Text>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
          <Text note>Location:</Text>
          <Text>{lecture.area}</Text>
          <Text note>Short description of the lecture:</Text>
          <Text>{lecture.description}</Text>
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
