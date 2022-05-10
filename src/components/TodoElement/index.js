import {useState, useEffect} from 'react'
import {v4} from 'uuid'
import {BiTask} from 'react-icons/bi'
import Header from '../Header'
import './index.css'
import TodoList from '../TodoList'

const TodoElement = ()=>{   
    const [todoInput, setTodoInput] = useState('')
    const [todoListContainer, setTodoListContainer] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [isEditing, setIsEdited] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)

    useEffect(()=>{
        setTodoListContainer(()=>JSON.parse(localStorage.getItem("Data")))
    },[])

    const changeTodoInput = event => {
        setTodoInput(event.target.value)
    }

    // step 1 - Adding the todo item in the tood list container
    const submitTodoForm = event => {
        event.preventDefault()
        document.title="Todo App"
        
        const newInput = {
            id:v4(),
            todoInput,
            isChecked,
            isEditing
        }
        if(todoInput !== ""){
            setTodoListContainer(prevState=>[...prevState,newInput,]) 
            setTodoInput('')
            // setCurrentPage(Math.floor(todoListContainer.length)/10+1)
        }else{
            alert("Enter valid Task")
        }
    }  
    
    // step 2 - toggle isChecked value
    const toggleIsCheckedValue = (id) => {
        const newTodos = [...todoListContainer].map(each=>{
            if(id===each.id){
                    setIsChecked(prevState=>[!prevState])
                    return {...each,isChecked:!each.isChecked}
                }
                return each
        })
        setTodoListContainer(newTodos)
    }

    // step 3 - Changing the isEdit value and changing the todo input value in the todo list container
    const editTodoValue=(id)=>{
        const newEditTodos = [...todoListContainer].map(each=>{
            if(id===each.id){
                    setIsEdited(prevState=>[!prevState])
                    return {...each,isEditing:!each.isEditing}
                }
                return each
        })
        setTodoListContainer(newEditTodos)
    }

    // step 3.1 - adding a functinality to edit option so on pressing enter the edited value will be displayed
    const onPressingEnter = (key,id) => {
        const onEnterTodos = [...todoListContainer].map(each=>{
            if(id===each.id && key==="Enter"){
                return {...each,isEditing:!each.isEditing}
            }
            return each
        })
        setTodoListContainer(onEnterTodos)
    }

    // step 3.2 - changing the edited todo input value and appending it to the todo list container
    const changeTodoInputValue = (updatedTitle,id)=>{
        const updatedTodoInput = [...todoListContainer].map(each=>{
            if (each.id === id) {
                each.todoInput = updatedTitle
              }
              return each
        })
        setTodoListContainer(updatedTodoInput)
    }
    
    // step 4 - delete the todo Items from todoListContainer
    const deleteTodoItem = id => {
        const filteredTodoList = todoListContainer.filter(each=>each.id!==id)
        setTodoListContainer(filteredTodoList)
    }

    // step 4.1 - Deleted completed items form the todo list container
    const deleteCompletedTasks=()=>{
        const removedItems = todoListContainer.filter(each=>(
            each.isChecked===false
        ))
        setTodoListContainer(removedItems)
    }

    // step 5 - Saving the todo item in local storage
    const saveTodo = ()=>{
        localStorage.setItem("Data",JSON.stringify(todoListContainer))
    }

    // Adding form to the UI
    const renderFormElement = () =>(
        <form onSubmit={submitTodoForm} className="form-container">
            <label htmlFor="todoInput" className="label-element">
                What is your plan?  <BiTask size={20}  />
            </label>
            <div className="input-and-button">
                <input type="text" value={todoInput} placeholder="Create a Task" className="input-element" id="todoInput" onChange={changeTodoInput}/>
                <button type="submit" className="add-button">Add</button>
            </div>
        </form>
    )

    // adding pagination to the form at the bottom of the page Yet to complete
   const renderPaginatedElement = () => {           
        const pages = Math.ceil(todoListContainer.length/10);

        // const pageNumbers = []
        // for (let i = 1; i <= pages; i++) {
        //     pageNumbers.push(i);
        //   }

        const nextPage = () =>{
            if(currentPage<pages){
            setCurrentPage(prevState=>prevState+1)
            }
        }
    
        const previousPage = () =>{
            if(currentPage >! 0){
            setCurrentPage(prevState=>  prevState-1)
            }
        }
    
        const paginatedData = () => {
            const startIndex = currentPage * 10 - 10;
            const endIndex = startIndex + 10;
            return todoListContainer.slice(startIndex,endIndex)
        }

        const pagesGroup = () => {
            let startPage = Math.floor((currentPage-1)/5 )*5
            return new Array(5).fill().map((_,index)=> startPage + index + 1)
        }

        const changePage = (event) =>{
            const pageNumber = Number(event.target.textContent)
            setCurrentPage(pageNumber)
        }

        return(
            <div className="page-container">
                <div>
                {paginatedData().map(each=>(
                    <TodoList todoItem={each} deleteTodoItem={deleteTodoItem} toggleIsCheckedValue={toggleIsCheckedValue} 
                     key={each.id} editTodoValue={editTodoValue} changeTodoInputValue={changeTodoInputValue}
                     onPressingEnterKey={onPressingEnter}/>
                ))}
                </div>
                <div className="pagination-container">
                    <button type="button" className='page-button' onClick={previousPage}>Previous Page</button>
                    {/* <p className='page-number'>{currentPage}</p> */}
                    <nav>
                        <ul className='pagination'>
                            {pagesGroup().map((number,index) => (
                            <li key={index}  >
                                <a href='!#' onClick={changePage} className={`page-number page-link ${currentPage === number ? 'active' : null}`}>
                                {number}
                                </a>
                            </li>
                            ))}
                        </ul>
                    </nav>
                    <button type="button" className='page-button' onClick={nextPage}>Next Page</button>
                </div>
                
            </div>
        )
    }    

    // rendering todo list items from todo list component
    const renderTodoListElement=()=>{
        const isEmpty=(todoListContainer.length>0)
        let count = 0
        
        return(
            <>
            <h2 className="tasks-heading">My Tasks</h2>
            <ul className="todo-list-container">
                {isEmpty?
                (<div>{renderPaginatedElement()}</div>):(<p className="count-para">No task added</p>)}

                {todoListContainer.map(each=>{
                    if(each.isChecked){
                        count+=1
                    }
                    return null
                })}

                {isEmpty&&
                <div className="count-container">
                    {count>0 ? <p className="count-para">{todoListContainer.length-count} Tasks to Complete</p>:<p className="count-para">{todoListContainer.length} tasks added</p>}
                    <button type="button" onClick={deleteCompletedTasks} className="tasks-added-button-element">Clear Completed Tasks: {count}</button>
                </div>}
            </ul>
            
            <button type="text" onClick={saveTodo} className="save-button-element">Save</button>
            </>
        )
    }

    // Returning the result of the functional component that was rendered using above components
    return(
        <div className="todo-main-container">
            <Header/>
            <div className="todo-inner-container">
                {renderFormElement()}
                {renderTodoListElement()}
                
            </div>
        </div>
            
        )

};

export default TodoElement


// const todoListContainer=JSON.parse(localStorage.getItem("Data"))
        // console.log(JSON.parse(localStorage.getItem("Data")))
        // let stringifiedTodoList = localStorage.getItem("Data");
        // let parsedTodoList = JSON.parse(stringifiedTodoList);
        // (todoListContainer.map(each=>(
                //     <TodoList todoItem={each} deleteTodoItem={this.deleteTodoItem} toggleIsCheckedValue={this.toggleIsCheckedValue} 
                //      key={each.id} editTodoValue={this.editTodoValue} changeTodoInputValue={this.changeTodoInputValue}
                //      onPressingEnterKey={this.onPressingEnter}
                //      />
                //      )))
                    //  (<Pagination todoItems={this.state.todoListContainer}/>)