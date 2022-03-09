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

interface IState {
    mouseIsEnter : boolean
}

export default class Item extends Component<IProps, IState> {


    handleEnter = () => {
        this.setState({mouseIsEnter:true})
    }

    handleLeave = () => {
        this.setState({mouseIsEnter:false})
    }

    render() {

        // const {id: string, content, owner, timestamp} = this.props;
        return (
            // <li>
            //     <label>
            //         <span>{this.props.id} | {this.props.content} | {this.props.owner} | {this.props.timestamp}</span>
            //     </label>
            // </li>

            <li className="li" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
            <Comment className="comment"
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
            </li>
        )
    }
}