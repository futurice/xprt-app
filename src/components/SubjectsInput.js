import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, Text, Item, View } from 'native-base';

export default class BlockButton extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChangeText = (text, index) => {
    const { values, onChange } = this.props;

    const newValues = Array.from(values);
    newValues[index] = text;
    onChange(newValues);
  };

  deleteRow = (index) => {
    const { values, onChange } = this.props;

    const newValues = Array.from(values);
    newValues.splice(index, 1);
    onChange(newValues);
  };

  addRow() {
    const { values, onChange } = this.props;

    const newValues = Array.from(values);
    newValues.push('');
    onChange(newValues);
  }

  render() {
    const { values } = this.props;

    return (
      <View>
        {
          values.map((value, index) => (
            <Item key={index}>
              <Button
                dark
                transparent
                onPress={() => this.deleteRow(index)}
              >
                <Icon name="close" />
              </Button>
              <Input
                autoFocus={!value && index === values.length - 1}
                value={value}
                onChangeText={text => this.onChangeText(text, index)}
              />
            </Item>
          ))
        }
        <Button
          dark
          transparent
          onPress={() => this.addRow()}
        >
          <Icon name="add" style={{ color: '#15a369' }} />
          <Text style={{ marginLeft: 20, color: '#15a369' }}>
            Add subject
          </Text>
        </Button>
      </View>
    );
  }
}
