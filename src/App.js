import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container } from './styles/globalStyles';

function App() {
  const [list, setList] = useState([])
  useEffect(()=>{
   axios
   .get("https://mern-todo-emuy.onrender.com/todos")
   .then(res=>{
    setList(res.data)
   }).catch(err=>{
    console.log(err)
   })
  })

  
  return (
    <Container>
       <TodoForm />
      <TodoList list={list}/>
    </Container>
  );
}

export default App;
