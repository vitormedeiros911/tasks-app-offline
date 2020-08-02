import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

import { styles } from './styles'
import commonStyles from '../../commonStyles'
import todayImage from '../../../assets/images/today.jpg'

import AddTask from '../AddTask'
import Task from '../../components/Task'

let customFonts = {
  'Lato': require('../../../assets/fonts/Lato.ttf'),
};

const initialState = {
  fontsLoaded: false,
  showAddTask: false,
  showDoneTasks: true,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {
  state = {
    ...initialState
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = async () => {
    await this._loadFontsAsync()
    const stateString = await AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }

    this.setState({ visibleTasks })
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    this.setState({ tasks }, this.filterTasks)
  }

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }

    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null
    })

    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <AddTask isVisible={this.state.showAddTask}
            onCancel={() => this.setState({ showAddTask: false })}
            onSave={this.addTask} />
          <ImageBackground source={todayImage}
            style={styles.background}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.toggleFilter}>
                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                  size={20} color={commonStyles.colors.secundary} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Hoje</Text>
              <Text style={styles.subtitle}>{today}</Text>
            </View>
          </ImageBackground>
          <View style={styles.taskList}>
            <FlatList data={this.state.visibleTasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item: task }) =>
                <Task {...task} toggleTask={this.toggleTask}
                  onDelete={this.deleteTask} />
              }
            />
          </View>
          <TouchableOpacity style={styles.addButton}
            onPress={() => this.setState({ showAddTask: true })}
            activeOpacity={0.7}>
            <Icon name="plus" size={20}
              color={commonStyles.colors.secundary} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return <AppLoading />
    }
  }
}
