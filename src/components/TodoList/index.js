
import { AiFillDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import './index.css'

const TodoList = (props) => {
    const { todoItem, deleteTodoItem, toggleIsCheckedValue, editTodoValue, changeTodoInputValue, onPressingEnterKey } = props
    const { id, todoInput, isChecked, isEditing } = todoItem

    const deleteTodo = () => {
        deleteTodoItem(id)
    }

    const toggleIsChecked = () => {
        toggleIsCheckedValue(id)
    }

    const editTodo = () => {
        editTodoValue(id)
    }

    const changeTodoInput = (event) => {
        changeTodoInputValue(event.target.value, id)
    }

    const onPressingEnter = event => {
        onPressingEnterKey(event.key, id)
    }

    const textClassName = isChecked ? "checked-class-name" : ''

    return (
        <div className='list-element-container'>
            <input type="checkbox" onChange={toggleIsChecked} value={isChecked} id={id} />
            <li key={id} className="todo-list-item">
                {!isEditing
                    ? <label className={`${textClassName} label-element-input`} htmlFor={id}>{todoInput}</label>
                    : <input className='edit-input' value={todoInput} type="text" id={id} onChange={changeTodoInput} onKeyDown={onPressingEnter} />
                }
                <div>
                    <button type="text" onClick={editTodo} className="edit-button-element"><FiEdit /></button>
                    <button type="text" onClick={deleteTodo} className="delete-button-element"><AiFillDelete size={20} /></button>
                </div>
            </li>
        </div>
    )
}

export default TodoList