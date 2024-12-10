import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Container = styled(motion.div)`
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const CheckedTasks = ({ tasks, updateTask }) => {
    const checkedTasks = tasks.filter(task => task.checked);

    const handleCheckboxChange = async (task) => {
        const updatedTask = { ...task, checked: !task.checked };
        try {
            await axios.put(`https://todo-backend-4fyf.onrender.com/todos/${task._id}`, updatedTask);
            updateTask(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (checkedTasks.length === 0) return null;

    return (
        <Container
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3>Checked Tasks</h3>
            <List>
                {checkedTasks.map(task => (
                    <ListItem key={task._id}>
                        <Checkbox
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => handleCheckboxChange(task)}
                        />
                        {task.title}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CheckedTasks;