import { Linking } from 'react-native';

const openUrl = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Error while opening url: ', url);
    }
  });
};

export default openUrl;
