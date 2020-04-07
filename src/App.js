import React from 'react';
import './App.css';

const axios = require('axios').default;

const TodoForm = ({addTodo}) => {
  let input;
    return (
      <div>
        <input ref={node => { 
        input = node;
      }}/>
        <button onClick={() => {
            addTodo(input.value);
            input.value = '';
          }}>
          +
        </button>
      </div>
    )
}

const Todo = ({todo, remove}) => {
  // Each Todo
     return (
       <li onClick={() => {
          remove(todo.id)
         }}>
        {todo.text}
       </li>
     )
}

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul>{todoNode}</ul>);
}
window.id = 0;
class ToDoApp extends React.Component {
  constructor (props) {
    super(props);
    // setting initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }

  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
  // Add todo handler
  addTodo(val){
   // Assemble data
   const todo = {text: val}
   // Update data
   axios.post(this.apiUrl, todo)
      .then((res) => {
         this.state.data.push(res.data);
         this.setState({data: this.state.data});
      });
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) {
        return todo;
      }
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
  }
  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default ToDoApp;
