import { StyleSheet } from "react-native";
import commonStyles from "../../commonStyles";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },

  container: {
    backgroundColor: '#FFF'
  },

  header: {
    fontFamily: 'Lato',
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secundary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18
  },

  input: {
    fontFamily: 'Lato',
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today
  },

  date: {
    fontFamily: 'Lato',
    fontSize: 16,
    marginLeft: 15
  }
})
