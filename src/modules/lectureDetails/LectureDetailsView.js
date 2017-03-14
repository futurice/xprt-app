import React, {PropTypes, Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Content, Button, Text, H1, H2, H3 } from 'native-base';


class LectureDetailsView extends Component {
  componentDidMount() {
    console.log('Hello');
    this.props.getLectureDetails(34658);
  }

  render() {
    return (
      <Container>
          <Content>
              <Text note>Theme of the lecture:</Text>
              <Text>{this.props.lectureDetails.title}</Text>
              <Text note>Date of the lecture:</Text>
              <Text>{new Date(this.props.lectureDetails.dates).toLocaleDateString('fi-FI')}</Text>
              <Text note>Location:</Text>
              <Text>{this.props.lectureDetails.area}</Text>
              <Text note>Short description of the lecture:</Text>
              <Text>{this.props.lectureDetails.description}</Text>
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
