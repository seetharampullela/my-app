import { Component } from "react";
import {v4} from 'uuid'
import {BiTask} from 'react-icons/bi'
import Header from '../Header'
import './index.css'
import TodoList from '../TodoList'


class TodoElement extends Component {
    state = {todoInput:'',todoListContainer:[],isChecked:false,isEditing:false}

    changeTodoInput = event => {
        this.setState({todoInput:event.target.value})
    }

    submitTodoForm = event => {
        event.preventDefault()
        const {todoInput,isChecked,isEditing} = this.state
        const newInput = {
            id:v4(),
            todoInput,
            isChecked,
            isEditing
        }
        if(todoInput !== ""){
            this.setState(prevState=>({
                todoListContainer: [...prevState.todoListContainer,newInput],
                todoInput: ''
            }))
        }else{
            alert("Enter valid Task")
        }
    }

    deleteTodoItem = id => {
        const {todoListContainer} = this.state
        const filteredTodoList = todoListContainer.filter(each=>each.id!==id)
        this.setState({todoListContainer:filteredTodoList})
    }

    renderFormElement = () =>{
        const {todoInput} = this.state
        return(
        <form onSubmit={this.submitTodoForm} className="form-container">
            <label htmlFor="todoInput" className="label-element">
                What is your plan?
                <BiTask size={20}/>
            </label>
            <div className="input-and-button">
                <input type="text" value={todoInput} placeholder="Create a Task" className="input-element" id="todoInput" onChange={this.changeTodoInput}/>
                <button type="submit" className="add-button">Add</button>
            </div>
        </form>
        )
    }

    toggleIsCheckedValue = (id) => {
        this.setState(prevState=>({
            todoListContainer:prevState.todoListContainer.map(each=>{
                if(id===each.id){
                    return {...each,isChecked:!each.isChecked}
                }
                return each
            })
        }))
    }

    saveTodo = ()=>{
        const{todoListContainer}=this.state
        localStorage.setItem("Data",JSON.stringify(todoListContainer))
    }

    editTodoValue=(id)=>{
        this.setState(prevState=>({
            todoListContainer:prevState.todoListContainer.map(each=>{
                if(id===each.id){
                    return {...each,isEditing:!each.isEditing}
                }
                return each
            })
        }))
        
    }

    changeTodoInputValue = (updatedTitle,id)=>{
        this.setState({
            todoListContainer: this.state.todoListContainer.map(todo => {
              if (todo.id === id) {
                todo.todoInput = updatedTitle
              }
              return todo
            }),
          })
    }

    onPressingEnter = (key,id) => {
        this.setState(prevState=>({
            todoListContainer:prevState.todoListContainer.map(each=>{
                if(id===each.id && key==="Enter"){
                    return {...each,isEditing:!each.isEditing}
                }
                return each
            })
        }))
    }
    
    renderTodoListElement=()=>{
        // const todoListContainer=JSON.parse(localStorage.getItem("Data"))
        const {todoListContainer} = this.state
        // console.log(JSON.parse(localStorage.getItem("Data")))
        // let stringifiedTodoList = localStorage.getItem("Data");
        // let parsedTodoList = JSON.parse(stringifiedTodoList);
        const isEmpty=(todoListContainer.length>0)
        

        return(
            <>
            <h2 className="tasks-heading">My Tasks</h2>
            <ul className="todo-list-container">
                {isEmpty&&todoListContainer.map(each=>(
                    <TodoList todoItem={each} deleteTodoItem={this.deleteTodoItem} toggleIsCheckedValue={this.toggleIsCheckedValue} 
                     key={each.id} editTodoValue={this.editTodoValue} changeTodoInputValue={this.changeTodoInputValue}
                     onPressingEnterKey={this.onPressingEnter}
                     />
                ))}
                {/* <button type="text" onClick={this.saveTodo} className="delete-button-element">Save</button> */}
            </ul>
            {/* {todoListContainer.map(each=>{
                if(each.isChecked){
                    return <p>hi</p>
                }return null
            })} */}
            </>
        )
    }

    render(){
        
        return(
        <div className="todo-main-container">
            <Header/>
            <div className="todo-inner-container">
                {this.renderFormElement()}
                {this.renderTodoListElement()}
            </div>
        </div>
            
        )
    }
}

export default TodoElement