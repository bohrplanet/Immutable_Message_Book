import React, { Component } from "react";
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import './index.css'

interface IProps {
    id: string,
    content: string,
    owner: string,
    timestamp: number
}

export default class Item extends Component<IProps, any> {

    

    render() {

        // const {id: string, content, owner, timestamp} = this.props;
        return (
            // <li>
            //     <label>
            //         <span>{this.props.id} | {this.props.content} | {this.props.owner} | {this.props.timestamp}</span>
            //     </label>
            // </li>

            <Comment
                author={this.props.owner}
                content={
                    <p className="content">
                        {this.props.content}
                    </p>
                }
                datetime={
                    <Tooltip title={moment.unix(this.props.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment.unix(this.props.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </Tooltip>
                }
            />
        )
    }
}