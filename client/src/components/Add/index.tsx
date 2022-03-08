import React, { Component } from "react";
import { Button } from 'antd';
import './index.css'

interface IProps {
    addPrediction : Function
}

interface IState {

}

export default class Add extends Component<IProps, IState> {

    inputRef = React.createRef<HTMLTextAreaElement>();

    sendToApp = () => {
        // const {inputRef} = this;
        // 将textarea中的内容传给APP处理
        // console.log("input value is ", inputRef.current?.value);
        this.props.addPrediction(this.inputRef.current?.value);
    }

    render() {
        return (
            <div className="todo-header">
                <textarea id="content" ref={this.inputRef} cols={50} rows={7}/>
                <br />
                {/* <button onClick={this.sendToApp}>Post My Prediction</button> */}
                <Button type="primary" onClick={this.sendToApp}>Post My Prediction</Button>
            </div>
        )
    }
}