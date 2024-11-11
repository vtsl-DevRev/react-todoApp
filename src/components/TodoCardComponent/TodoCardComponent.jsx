import React from 'react'
import './TodoCardComponent.css'

const TodoCardComponent = ({ todo, todoType, moveTodo, deleteTodo, editTodo }) => {

    const handleMoveTodo = (e) => {
        e.preventDefault();
        moveTodo(todo, todoType, e.target.value);
    };

    const handleDeleteTodo = (e) => {
        e.preventDefault();
        deleteTodo(todo, todoType);
    };

    const handleEditTodo = (e) => {
        e.preventDefault();
        editTodo(todo, todoType);
    };

    return (
        <div className='cardComponent' id={todo}>
            <p>{todo}</p>
            <div id='buttons'>
                <button onClick={handleEditTodo} id='editBtn'>E</button>
                <button onClick={handleMoveTodo} value="inProgress" style={{ display: todoType === 'pending' || todoType === 'completed' ? 'inline' : 'none' }} id='progerssBtn'>Progress</button>
                <button onClick={handleMoveTodo} value="completed" style={{ display: todoType === 'inProgress' || todoType === 'pending' ? 'inline' : 'none' }} id='completedBtn'>Completed</button>
                <button onClick={handleMoveTodo} value="pending" style={{ display: todoType === 'completed' || todoType === 'inProgress' ? 'inline' : 'none' }} id='pendingBtn'>Pending</button>
                <button onClick={handleDeleteTodo} id='deleteBtn'>X</button>
            </div>
        </div>
    )
}

export default TodoCardComponent
