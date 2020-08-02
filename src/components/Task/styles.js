import { StyleSheet } from "react-native";

import commonStyles from './../../commonStyles'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF'
  },

  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555'
  },

  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc: {
    fontFamily: 'Lato',
    color: commonStyles.colors.mainText,
    fontSize: 15
  },

  date: {
    fontFamily: 'Lato',
    color: commonStyles.colors.subText,
    fontSize: 12
  },

  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20
  },

  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },

  excludeIcon: {
    marginLeft: 10
  },

  excludeText: {
    fontFamily: 'Lato',
    color: '#FFF',
    fontSize: 20,
    margin: 10
  }
})
