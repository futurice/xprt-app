import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';
import styles from './loginStyles';

export default class FormExample extends Component {
  static navigationOptions = {
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-key-outline" style={{ color }} />
      ),
      visible: true,
    }),
  };
  open = () => {
    this.props.navigate({
      routeName: 'OAuth2Login',
    });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text>You have to be logged in to view and manage your profile and collaborations</Text>
          <Form>
            <Item stackedLabel last>
              <Label style={styles.labelStyle}>E-mail:</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.labelStyle}>Password:</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button full transparent>
            <Text style={styles.labelStyle}>FORGOT PASSWORD?</Text>
          </Button>

          <Text style={styles.center}>{"Don't have an account yet?"}</Text>

          <Button full transparent>
            <Text style={styles.labelStyle}>CREATE AN ACCOUNT</Text>
          </Button>
        </Content>
        <Button full style={styles.loginHundred} onPress={() => { this.open(); }}>
          <Text>LOG IN WITH HUNDRED</Text>
        </Button>
        <Button dark full>
          <Text style={styles.loginButton}>LOG IN</Text>
        </Button>
      </Container>
    );
  }
}
