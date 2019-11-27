import React from 'react';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import loadingGif from './loader1.gif';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      error: null,
      loading: true,
      todos: []
    }

    this.apiUrl = 'https://5ddd242ef40ae700141e8d39.mockapi.io';

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.alert = this.alert.bind(this);

  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);

    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      })
    }, 1000)

  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value })
    console.log(event.target.name, event.target.value);
  }

  async addTodo() {

    const response = await axios.post(`${this.apiUrl}/todos`, { name: this.state.newTodo })
    const todos = this.state.todos;

    todos.push(response.data);

    this.setState({ todos, newTodo: '' })
    this.alert('Todo Added Successfully');
    console.log(response);
  }

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];

    this.setState({ todos });
    this.alert('Todo Deleted Successfully');
  }

  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({ editing: true, newTodo: todo.name, editingIndex: index })
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    })

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;

    this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });
    this.alert('Todo Updated Successfully');
  }


  alert(notification) {
    this.setState({
      notification
    })

    setTimeout(() => {
      this.setState({ notification: null })
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <h1 className="text-center p-4">Todos App</h1>

        {
          this.state.notification &&
          <div className="container">
            <div className="alert alert-success mt-3">
              <p className="text-center">
                {this.state.notification}
              </p>
            </div>
          </div>
        }


        <div className="container">
          <input
            className="form-control my-4 p-4"
            type="text"
            placeholder="Add a new To-Do"
            name="todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          ></input>

          <button
            name="btnAddTodo"
            className="btn-success form-control my-4 btn-xs"
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTodo.length < 5}
          >
            {
              this.state.editing ? 'Update Todo' : 'Add Todo'
            }
          </button>

          {this.state.loading &&
            <img src={loadingGif} alt=""></img>
          }
        </div>

        <div className="container">
          {(!this.state.editing || this.state.loading) &&
            <ul className="list-group">
              {
                this.state.todos.map((item, index) => {
                  return <ListItem
                    item={item}
                    key={item.id}
                    editTodo={() => this.editTodo(index)}
                    deleteTodo={() => this.deleteTodo(index)}
                  />
                })
              }
            </ul>
          }
        </div>

      </div >
    );
  }
}

export default App;
