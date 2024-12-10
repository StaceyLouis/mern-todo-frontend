import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios'; 

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled(motion.li)`
    padding: 2rem 0;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        padding: 8px;
    }

    @media (max-width: 480px) {
        padding: 6px;
    }
`;

const TaskInput = styled.input`
    border: 1px solid #ccc;
    background: #fff;
    color: black;
    font-size: 1.2rem;
    width: 100%;
    &:focus {
        outline: none;
    }
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const TrashIcon = styled(FaTrash)`
    cursor: pointer;
    color: #ff0000;
    margin-left: 10px;

    &:hover {
        color: #cc0000;
    }
`;

const PencilIcon = styled(FaPencilAlt)`
    cursor: pointer;
    color: #007bff;
    margin-left: 10px;

    &:hover {
        color: #0056b3;
    }
`;

const TaskList = ({ tasks, removeTask, updateTask }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (!isConfirmed) return;

        try {
            await axios.delete(`https://todo-backend-4fyf.onrender.com/todos/${id}`);
            removeTask(id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdate = async (task) => {
        if (!taskTitle.trim()) {
            alert("Task title cannot be empty");
            return;
        }

        const updatedTask = { ...task, title: taskTitle }; // Update the task title
        try {
            await axios.put(`https://todo-backend-4fyf.onrender.com/todos/${task._id}`, updatedTask);
            updateTask(updatedTask);
            setEditingTaskId(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCheckboxChange = async (task) => {
        const updatedTask = { ...task, checked: !task.checked };
        try {
            await axios.put(`https://todo-backend-4fyf.onrender.com/todos/${task._id}`, updatedTask);
            updateTask(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleInputChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleInputBlur = (task) => {
        handleUpdate(task);
    };

    const handlePencilClick = (task) => {
        setEditingTaskId(task._id);
        setTaskTitle(task.title); // Set the task title when the pencil icon is clicked
    };

    return (
        <List>
            {tasks.filter(task => !task.checked).map((task) => (
                <ListItem
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <Checkbox
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => handleCheckboxChange(task)}
                    />
                    {editingTaskId === task._id ? (
                        <TaskInput
                            type="text"
                            value={taskTitle}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur(task)}
                            autoFocus
                        />
                    ) : (
                        <span>{task.title}</span>
                    )}
                    <div>
                        <PencilIcon onClick={() => handlePencilClick(task)} />
                        <TrashIcon onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }} />
                    </div>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;