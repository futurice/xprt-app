import React, {PropTypes, Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Content, Button, Text, H1, H2, H3 } from 'native-base';


class LectureDetailsView extends Component {
  componentDidMount() {
    console.log('Hello');
  }

  render() {
    return (
      <Container>
          <Content>
              <Text>Theme of the lecture:</Text>
              <H3>What is entrepreneurship?</H3>
              <Text>Date of the lecture:</Text>
              <H3>12.5.2017</H3>
              <Text>Location:</Text>
              <H3>Helsinki Internation School</H3>
              <Text>Short description of the lecture:</Text>
              <H3>The lecture is part of the course, "Introduction to entrepreneurship,"
                is designed for high school students with little or no background in the field.</H3>
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
    );
  }
}

export default LectureDetailsView;
