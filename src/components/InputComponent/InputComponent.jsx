import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import ListComponent from '../ListComponent/ListComponent';
import './InputComponent.css'

const InputComponent = () => {

    const [todo, setTodo] = useState('');
    const [todosPending, setTodosPending] = useState(JSON.parse(localStorage.getItem('todosPending')) || []);
    const [todosInProgress, setTodosInProgress] = useState(JSON.parse(localStorage.getItem('todosInProgress')) || []);
    const [todosCompleted, setTodosCompleted] = useState(JSON.parse(localStorage.getItem('todosCompleted')) || []);
    const [search, setSearch] = useState('');
    const [highlightedTodo, setHighlightedTodo] = useState(null);

    const addTodo = (e) => {
        e.preventDefault();
        if (todo.trim() === '') {
            return;
        }
        if (todosPending.includes(todo) || todosInProgress.includes(todo) || todosCompleted.includes(todo)) {
            return;
        }
        setTodosPending([...todosPending, todo]);
        setTodo('');
    };

    const moveTodo = useCallback((todo, from, to) => {
        if (from === "pending") setTodosPending(todosPending.filter((t) => t !== todo));
        if (from === "inProgress") setTodosInProgress(todosInProgress.filter((t) => t !== todo));
        if (from === "completed") setTodosCompleted(todosCompleted.filter((t) => t !== todo));
        if (to === "pending") setTodosPending([...todosPending, todo]);
        if (to === "inProgress") setTodosInProgress([...todosInProgress, todo]);
        if (to === "completed") setTodosCompleted([...todosCompleted, todo]);
    }, [todosPending, todosInProgress, todosCompleted]);

    const deleteTodo = useCallback((todo, from) => {
        if (from === "pending") setTodosPending(todosPending.filter((t) => t !== todo));
        if (from === "inProgress") setTodosInProgress(todosInProgress.filter((t) => t !== todo));
        if (from === "completed") setTodosCompleted(todosCompleted.filter((t) => t !== todo));
    }, [todosPending, todosInProgress, todosCompleted]);

    const editTodo = useCallback((todo, from) => {
        if (from === "pending") setTodosPending(todosPending.filter((t) => t !== todo));
        if (from === "inProgress") setTodosInProgress(todosInProgress.filter((t) => t !== todo));
        if (from === "completed") setTodosCompleted(todosCompleted.filter((t) => t !== todo));
        setTodo(todo);
    }, [todosPending, todosInProgress, todosCompleted]);

    const clearList = useCallback((list) => {
        if (list === "pending") setTodosPending([]);
        if (list === "inProgress") setTodosInProgress([]);
        if (list === "completed") setTodosCompleted([]);
    }, [todosPending, todosInProgress, todosCompleted]);

    useEffect(() => {
        localStorage.setItem('todosPending', JSON.stringify(todosPending));
        localStorage.setItem('todosInProgress', JSON.stringify(todosInProgress));
        localStorage.setItem('todosCompleted', JSON.stringify(todosCompleted));
    }, [todosPending, todosInProgress, todosCompleted]);

    const searchTodo = (e) => {
        e.preventDefault();

        const allTodos = [...todosPending, ...todosInProgress, ...todosCompleted];
        const match = [];

        allTodos.forEach(todo => {
            if (todo.toLowerCase().includes(search.toLowerCase())) {
                match.push(todo);
            }
        });

        if (match.length > 0) {
            match.forEach(matchedTodo => {
                const todoElement = document.getElementById(matchedTodo);
                todoElement.style.backgroundColor = 'skyblue';
                todoElement.scrollIntoView({ behavior: 'smooth' });
            });

            setTimeout(() => {
                match.forEach(matchedTodo => {
                    const todoElement = document.getElementById(matchedTodo);
                    todoElement.style.backgroundColor = 'white';
                });
            }, 5000);
            
        } else {
            alert('No match found!');
        }
        setSearch('');
    };

    return (
        <div id='mainComponent'>
            <div id='inputForm'>
                <form onSubmit={addTodo}>
                    <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                    <button type="submit">Add</button>
                </form>
                <form onSubmit={searchTodo} id='search'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div id='listContainer'>
                <ListComponent listName="pending" list={todosPending} moveTodo={moveTodo} deleteTodo={deleteTodo} editTodo={editTodo} clearList={clearList} />
                <ListComponent listName="inProgress" list={todosInProgress} moveTodo={moveTodo} deleteTodo={deleteTodo} editTodo={editTodo} clearList={clearList} />
                <ListComponent listName="completed" list={todosCompleted} moveTodo={moveTodo} deleteTodo={deleteTodo} editTodo={editTodo} clearList={clearList} />
            </div>
        </div>
    )
}

export default InputComponent