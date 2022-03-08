import React, { Component, useLayoutEffect } from "react";
import Item from "../Item"
import './index.css'

// export default class List extends Component {

//     render() {
//         const {todos} = this.props;
//         return (
//             <ul className="todo-main">
//                 {
//                     todos.map((prediction, index) => {
//                         return <Item key={prediction.id} {...prediction}/>
//                     })
//                 }
//             </ul>

//         )
//     }
// }

interface prediction {
    id: string,
    content: string,
    owner: string,
    timestamp: string
}

interface IProps {
    todos: prediction[];
}

const List: React.FC<IProps> = (props) => {

    return <ul className="todo-main">
        {
            props.todos.map((prediction, index) => {
                return <Item key={prediction.id} {...prediction} />
            })
        }
    </ul>


}

export default List