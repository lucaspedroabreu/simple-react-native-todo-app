import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskTitle = tasks.find(task => task.title === newTaskTitle)

    if(hasTaskTitle) {
      Alert.alert("Task já cadastrada", "Você não pode criar um task com o mesmo nome")
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, newTask])
    }
    //DONE - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))
    const foundTask = updatedTasks.find(task => task.id === id)
    
    if (!foundTask) return

    foundTask.done = !foundTask.done

    setTasks(updatedTasks)
    //DONE - toggle task done if exists
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "você tem certeza que deseja remover esse item?", 
      [
        {
          text: "Sim", 
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id)
            setTasks(updatedTasks)
          }
        }, 
        {
          text: "Não", 
          style: "cancel"
        }
      ]
    )
    //DONE - remove task from state
  }

  function handleEditTask({taskId, newTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}))
    const foundTask = updatedTasks.find(task => task.id === taskId)
    
    if (!foundTask) return

    foundTask.title = newTitle

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})