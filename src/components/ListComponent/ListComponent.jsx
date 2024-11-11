import React from 'react'
import TodoCardComponent from '../TodoCardComponent/TodoCardComponent'
import './ListComponent.css'

const ListComponent = ({ listName, list, moveTodo, deleteTodo, editTodo, clearList }) => {

    const handleClearList = (e) => {
        e.preventDefault();
        clearList(listName);
    };

    return (
        <div id={listName}>
            <h2>{listName}</h2>
            <div>
                {list.map((todo, index) => (
                    <TodoCardComponent key={index} todo={todo} todoType={listName} moveTodo={moveTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
                ))}
            </div>
            {
                list.length === 0 ? null : <button onClick={handleClearList} id='clearList'>Clear List</button>
            }
        </div>
    )
}

export default ListComponent