import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import {Body, Badge, Card, CardItem, Button, Container, Content, Icon, Left, Right, Spinner, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import defaultProfile from '../../../images/icons/ic_person.png';

import variables from '../../../native-base-theme/variables/platform';

class ExpertDetailsView extends Component {
  static navigationOptions = {
    header: () => ({
      style: {
        backgroundColor: '#333333',
        elevation: 0
      },
      titleStyle: {
        color: '#15a369'
      },
      tintColor: '#15a369'
    })
  };

  componentDidMount() {
    this.props.getExpertDetails(this.props.expertId);
  }

  render() {
    const {expert, loading} = this.props;
    let thumbnailSource = expert.imageUrl ? {uri: expert.imageUrl} : defaultProfile;

    return ( loading ? (
      <Container>
        <Content>
          <Spinner color={styles.spinner.color}/>
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
          <Grid style={{backgroundColor: '#333333', paddingBottom: 10}}>
            <Row>
              <Col style={[styles.center, { height: 200 }]}>
                <Button transparent style={styles.button} warning>
                  <Icon name='mail' />
                </Button>
              </Col>
              <Col style={[styles.center, { height: 200  }]}>
                <Thumbnail style={{width: 140, height: 140, borderRadius: 70}} source={thumbnailSource} />
              </Col>
              <Col style={[styles.center, { height: 200  }]}>
                <Button transparent style={styles.button} warning>
                  <Icon name='call' />
                </Button>
              </Col>
            </Row>
            <Row>
              <Body>
                <Text style={styles.name}> {expert.name} </Text>
                <Text style={styles.lightText}> {expert.title} </Text>
                <Text style={styles.lightText}> {expert.area} </Text>
                <View style={{flexDirection: 'row'}}>
                  {
                    expert.subjects.map((subject, index) => {
                      return (
                        <Badge style={styles.subjectBadge} key={index}>
                          <Text style={styles.subjectText}> {subject} </Text>
                        </Badge>
                      );
                    })
                  }
                </View>
              </Body>
            </Row>
          </Grid>
          <Grid style={{paddingHorizontal: 20, paddingTop: 20}}>
            <Row>
              <Text style={styles.aboutText}>About {expert.name}:</Text>
            </Row>
            <Row>
              <Text style={styles.description} note>{expert.description}</Text>
            </Row>
          </Grid>
        </Content>
        <Button large block style={{marginBottom: -1, backgroundColor: variables.darkBg, borderRadius: 0}}>
          <Text style={{fontSize: 18, color: '#f0ad4e'}}>SEND A LECTURE INVITATION</Text>
        </Button>
      </Container>
    ));
  }
}

const styles = {
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center'
  },
  spinner: {
    color: 'green'
  },
  expertPage: {
    flex: 1
  },
  name: {
    color: variables.brandGreen,
    alignSelf: 'center',
    fontSize: 24,
    paddingBottom: 10
  },
  lightText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    paddingBottom: 8
  },
  subjectBadge: {
    backgroundColor: variables.darkBg,
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 12,
    height: 28,
    margin: 3
  },
  subjectText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'justify'
  },
  aboutText: {
    color: 'black',
    fontSize: 20
  },
  description: {
    fontSize: 16
  },
  expertPhoto: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  expertBasicInfo: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center'
  },
  expertAbout: {
    flex: 3,
    backgroundColor: 'powderblue',
    alignItems: 'center'
  }
};

export default ExpertDetailsView;
