import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item">{props.item.name}
        <button
            className="btn-warning btn-xs ml-4"
            onClick={props.editTodo}
        ><i className="fa fa-edit"></i></button>
        <button
            className="btn-danger btn-xs ml-4"
            onClick={props.deleteTodo}
        ><i className="fa fa-trash"></i></button>
    </li>;
}

export default ListItem;