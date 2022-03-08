import React, { Component } from "react";

interface IProps {
    id: string,
    content: string,
    owner: string,
    timestamp: string
}

export default class Item extends Component<IProps, any> {
    render() {
        // const {id: string, content, owner, timestamp} = this.props;
        return (
            <li>
                <label>
                    <span>{this.props.id} | {this.props.content} | {this.props.owner} | {this.props.timestamp}</span>
                </label>
            </li>
        )
    }
}