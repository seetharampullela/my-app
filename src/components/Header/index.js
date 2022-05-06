import {RiCalendarTodoFill} from 'react-icons/ri'
import './index.css'

const Header = () => 
    (
        <div className='header-container'>
            <h1 className="todo-heading">
                Simple Todo Application
            </h1>
            <RiCalendarTodoFill size={25} color="white"/>
        </div>
    )


export default Header