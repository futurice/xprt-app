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
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const { text, style, ...rest } = this.props;

    return (
      <Button large full style={{ ...styles.button, ...style }} {...rest}>
        <Text
          style={{
            ...styles.text,
            opacity: this.props.disabled ? 0.25 : 1.0,
          }}
        >
          { text.toUpperCase() }
        </Text>
      </Button>
    );
  }
}
