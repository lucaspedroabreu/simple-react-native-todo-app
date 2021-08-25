import React from 'react';
import { FlatList } from 'react-native';
import { EditTaskArgs } from '../pages/Home';

import { ItemWrapper } from './ItemWrapper';

import { TaskItem } from '../components/TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, newTitle}: EditTaskArgs) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem index={index} task={item} toggleTaskDone={toggleTaskDone} removeTask={removeTask} editTask={editTask} />
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}