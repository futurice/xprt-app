import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Body, Badge, Button, Container, Content, Icon, Spinner, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import defaultProfile from '../../../images/icons/ic_person.png';
import styles from './expertDetailStyles';

class ExpertDetailsView extends Component {
  static navigationOptions = {
    header: styles.headerStyle,
  };

  componentDidMount() {
    this.props.getExpertDetails(this.props.expertId);
  }

  render() {
    const { expert, loading } = this.props;
    const thumbnailSource = expert.imageUrl ? { uri: expert.imageUrl } : defaultProfile;
    const subjects = expert.subjects || [];
    const areas = expert.area || [];

    return (loading ? (
      <Container>
        <Content>
          <Spinner color={styles.spinner.color} />
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
          <Grid style={styles.profileGrid}>
            <Row>
              <Col style={styles.profileGridCol}>
                <Button transparent style={styles.iconButton} warning>
                  <Icon name="mail" />
                </Button>
              </Col>
              <Col style={styles.profileGridCol}>
                <Thumbnail style={styles.avatarLarge} source={thumbnailSource} />
              </Col>
              <Col style={styles.profileGridCol}>
                <Button transparent style={styles.iconButton} warning>
                  <Icon name="call" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Body>
                <Text style={styles.name}> {expert.name} </Text>
                <Text style={styles.lightText}> {expert.title} </Text>
                <View style={styles.rowflow}>
                  <Text style={styles.subjectText}> Visit possible: </Text>
                  {
                    areas.map(area => (
                      <Text style={styles.subjectText} key={area}> {area} </Text>
                    ))
                  }
                </View>
                <View style={styles.rowflow}>
                  {
                    subjects.map(subject => (
                      <Badge style={styles.subjectBadge} key={subject}>
                        <Text style={styles.subjectText}> {subject} </Text>
                      </Badge>
                    ))
                  }
                </View>
              </Body>
            </Row>
          </Grid>
          <Grid style={styles.aboutGrid}>
            <Row>
              <Text style={styles.aboutText}>About {expert.name}:</Text>
            </Row>
            <Row>
              <Text style={styles.description} note>{expert.description}</Text>
            </Row>
          </Grid>
        </Content>
        <Button large block style={styles.blockButton}>
          <Text style={styles.blockButtonText}>SEND A LECTURE INVITATION</Text>
        </Button>
      </Container>
    ));
  }
}

export default ExpertDetailsView;
