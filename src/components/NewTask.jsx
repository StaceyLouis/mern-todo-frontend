import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: transparent;
`;



const PlusIcon = styled(FaPlus)`
    margin-left: 10px;
    cursor: pointer;
    color: grey;
`;

const NewTaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = { title, checked };
            console.log('Posting new task:', taskData);
            const response = await axios.post('https://todo-backend-4fyf.onrender.com/todos', taskData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('New task posted:', response.data);
            addTask(response.data);
            setTitle('');
            setChecked(false);
        } catch (error) {
            console.error('Error posting new task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputContainer>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                />
                <PlusIcon onClick={handleSubmit} />
            </InputContainer>
        </Form>
    );
};

export default NewTaskForm;