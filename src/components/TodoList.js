import React from 'react'
import uuid from 'react-uuid'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const TodoList = ({list}) => {
const todos = list.map(i =>{
    return(  
       
               <ListItemText primary={i.post} key={uuid()}/>
    
    )
})
  return (
    <>
  <List sx={{bgcolor: "background.paper",maxWidth: 360}}>
    <ListItem>
    <ListItemIcon>
        </ListItemIcon>
          {todos}
              </ListItem>              
            </List>
    </>
  )
}

export default TodoList