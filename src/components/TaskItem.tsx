import React, { useEffect, useRef, useState } from 'react'
import { Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editingIcon from '../assets/icons/pencil/Pencil.png'

import { EditTaskArgs } from '../pages/Home';
import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList'

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, newTitle}: EditTaskArgs) => void;
}  

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title)

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsBeingEdited(true)
    }

    function handleCancelEditing() {
        setUpdatedTaskTitle(task.title)
        setIsBeingEdited(false)
    }

    function handleSubmitEditing() {
        editTask({taskId: task.id, newTitle: updatedTaskTitle})
        setIsBeingEdited(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isBeingEdited) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isBeingEdited])
    return (
        <ItemWrapper index={index}>
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                    //DONE - use onPress (toggle task) prop
                >

                    <View 
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    //DONE - use style prop 
                    >

                    { task.done && (
                        <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                        />
                    )}

                    </View>

                    <TextInput
                    value={updatedTaskTitle}
                    onChangeText={setUpdatedTaskTitle}
                    editable={isBeingEdited ? true : false}
                    onSubmitEditing={() => handleSubmitEditing()}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                    //DONE - use style prop
                    />

                </TouchableOpacity>

                <View style={styles.iconsContainer}>

                    { isBeingEdited ? (
                        <TouchableOpacity
                            onPress={() => handleCancelEditing()}
                        >
                            <Icon 
                            name="x"
                            size={24}
                            color="#999"
                            />
                        </TouchableOpacity>

                    ) : (
                        <TouchableOpacity
                            onPress={() => handleStartEditing()}
                        >
                            <Image source={editingIcon} />

                        </TouchableOpacity>
                    )}

                    <View style={styles.divider}></View>

                    { isBeingEdited ? (
                        <TouchableOpacity
                            onPress={() => handleSubmitEditing()}
                        >
                            <Icon 
                            name="check"
                            size={24}
                            color="#999"
                            />
                        </TouchableOpacity>

                    // instead of submitting the editing text via check icon, we can let it happen only via submit and disable the garbage
                    //    <TouchableOpacity
                    //     disabled={isEditing}
                    //     onPress={() => removeTask(task.id)}
                    //   >
                    //     <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                    //   </TouchableOpacity>

                    ) : (
                        <TouchableOpacity
                            onPress={() => removeTask(task.id)}
                        >
                            
                            <Image source={trashIcon} />
                        
                        </TouchableOpacity>
                    )}

                </View>
            </View>
        </ItemWrapper>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 24,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: 'lightgray',
        marginHorizontal: 12,
    }
})