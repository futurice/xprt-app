import React, {Component} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import {Container} from 'native-base';

class ExpertDetailsView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getExpert();
  }

  render() {
    return (
      <Container>
        <Text> Experts Details </Text>
      </Container>
    );
  }
}

export default ExpertDetailsView;
