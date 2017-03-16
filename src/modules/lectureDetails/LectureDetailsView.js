import React, {PropTypes, Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Content, Button, Text, H1, H2, H3, Spinner } from 'native-base';


class LectureDetailsView extends Component {
  componentDidMount() {
    this.props.getLectureDetails(this.props.lectureId);
  }
  static navigationOptions = {
    title: 'testi',
    header: navigation => ({
      style: {
        backgroundColor: '#333333'
      },
      titleStyle: {
        color: '#15a369'
      },
      tintColor:'#15a369'
    })
  };
  render() {
    return (this.props.lectureDetails.loading ? (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
            <Text note>Theme of the lecture:</Text>
            <Text>{this.props.lectureDetails.data.title}</Text>
            <Text note>Date of the lecture:</Text>
            <Text>{new Date(this.props.lectureDetails.data.dates).toLocaleDateString('fi-FI')}</Text>
            <Text note>Location:</Text>
            <Text>{this.props.lectureDetails.data.area}</Text>
            <Text note>Short description of the lecture:</Text>
            <Text>{this.props.lectureDetails.data.description}</Text>
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
