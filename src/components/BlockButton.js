import React, { Component, PropTypes } from 'react';

import { Button, Text } from 'native-base';

import variables from '../../native-base-theme/variables/platform';

const styles = {
  button: {
    backgroundColor: variables.darkBg,
  },
  text: {
    color: variables.brandYellow,
  },
};

export default class BlockButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text } = this.props;

    return (
      <Button large full style={styles.button} {...this.props}>
        <Text style={styles.text}>
          { text.toUpperCase() }
        </Text>
      </Button>
    );
  }
}
