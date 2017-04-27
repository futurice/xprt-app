import variables from '../../../native-base-theme/variables/platform';

const styles = {
  navigateIcon: {
    height: 15,
    width: 15,
  },
  rowflow: {
    flexDirection: 'row',
  },
  rowText: {
    color: '#333333',
  },
  subjectBadge: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 12,
    height: 20,
    margin: 3,
  },
  subjectText: {
    fontSize: 10,
    textAlign: 'justify',
  },
  // pending, accepted, rejected, completed, canceled
  accepted: {
    backgroundColor: '#15a369',
  },
  completed: {
    backgroundColor: '#cccccc',
  },
  pending: {
    backgroundColor: '#eab94e',
  },
  canceled: {
    backgroundColor: '#cccccc',
  },
  rejected: {
    backgroundColor: 'tomato',
  },
  xprtGreen: {
    backgroundColor: variables.brandGreen,
  },
};

module.exports = styles;
