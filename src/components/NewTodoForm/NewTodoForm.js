import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodoRequest } from '../../redux/thunks';
import { getTodos } from '../../redux/selectors';
import './NewTodoForm.css';

const NewTodoForm = ({todos, onCreatePressed}) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div className='new-todo-form'>
            <input
                type="text"
                placeholder="Type your new todo here"
                className="new-todo-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button
                onClick={() => {
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className="new-todo-button">
                Create Todo
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);