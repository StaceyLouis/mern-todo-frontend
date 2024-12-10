import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTask';
import TaskList from './components/TaskList';
import CheckedTasks from './components/CheckedTasks';
import styled from 'styled-components';
import { Card } from './globalStyles';
import { AnimatePresence } from 'framer-motion';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const App = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://todo-backend-4fyf.onrender.com/todos');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const removeTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    };

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    };

    return (
        <GridContainer>
            <Card
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <NewTaskForm addTask={addTask} />
                <AnimatePresence>
                    <TaskList tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
                </AnimatePresence>
            </Card>
            <CheckedTasks tasks={tasks} updateTask={updateTask} />
        </GridContainer>
    );
};

export default App;