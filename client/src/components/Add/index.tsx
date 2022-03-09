import React, { Component } from "react";
import { Button, Input } from 'antd';
import './index.css'

interface IProps {
    addPrediction : Function
}

interface IState {

}

const { TextArea } = Input;

export default class Add extends Component<IProps, IState> {
// export default class Add extends Component {

    inputRef = React.createRef<any>();
    // inputRef = React.createRef(null);

    sendToApp = () => {
        // const {inputRef} = this;
        // 将textarea中的内容传给APP处理
        // console.log("input value is ", this.inputRef.current?.resizableTextArea.textArea.value);
        // console.log("input value is ", this.inputRef.current?.value);
        this.props.addPrediction(this.inputRef.current?.resizableTextArea.textArea.value);
    }

    render() {
        return (
            <div className="todo-header">
                <TextArea id="content" ref={this.inputRef} cols={50} rows={7} />
                {/* <textarea id="content" ref={this.inputRef} onChange={change2} cols={50} rows={7}/> */}
                <br />
                <br />
                {/* <button onClick={this.sendToApp}>Post My Prediction</button> */}
                <Button type="primary" onClick={this.sendToApp}>Post My Prediction</Button>
            </div>
        )
    }
}