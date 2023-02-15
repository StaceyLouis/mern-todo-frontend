import React from 'react'
import { TextField, Button } from '@mui/material'
import { Title } from '../styles/globalStyles'

const TodoForm = () => {
  return (
    <>
    <Title>My Tasks</Title>
    <form>
      <TextField id="standard-basic"
       label="Add task"
       variant="standard"
       fullWidth  margin="dense"/>
       <Button variant='outlined' color='inherit'>
        Add 
       </Button>
    </form>
    </>
  )
}

export default TodoForm