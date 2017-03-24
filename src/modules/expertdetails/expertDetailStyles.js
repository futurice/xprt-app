import variables from '../../../native-base-theme/variables/platform';

const styles = {
  aboutGrid: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  aboutText: {
    color: 'black',
    fontSize: 20,
  },
  avatarLarge: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  blockButton: {
    marginBottom: -1,
    backgroundColor: variables.darkBg,
    borderRadius: 0,
  },
  blockButtonText: {
    fontSize: 18,
    color: '#f0ad4e',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
  },
  headerStyle: {
    style: {
      backgroundColor: '#333333',
      elevation: 0,
    },
    titleStyle: {
      color: '#15a369',
    },
    tintColor: '#15a369',
  },
  iconButton: {
    alignSelf: 'center',
  },
  lightText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    paddingBottom: 8,
  },
  name: {
    color: variables.brandGreen,
    alignSelf: 'center',
    fontSize: 24,
    paddingBottom: 10,
  },
  profileGrid: {
    backgroundColor: '#333333',
    paddingBottom: 10,
  },
  profileGridCol: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  rowflow: {
    flexDirection: 'row',
  },
  spinner: {
    color: 'green',
  },
  subjectBadge: {
    backgroundColor: variables.darkBg,
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 12,
    height: 28,
    margin: 3,
  },
  subjectText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'justify',
  },
};

module.exports = styles;
