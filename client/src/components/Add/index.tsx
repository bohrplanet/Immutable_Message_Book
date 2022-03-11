import React, { Component, TextareaHTMLAttributes } from "react";
import { Divider, Button, Input, message } from 'antd';
import './index.css'

interface IProps {
    addPrediction: Function
    accounts: string[]
    chainId: number
}

interface IState {
    area: string
}

const { TextArea } = Input;

export default class Add extends Component<IProps, IState> {
    // export default class Add extends Component {

    inputRef = React.createRef<any>();
    // inputRef = React.createRef(null);

    componentWillMount = async () => {
        this.setState({area: ""});
    }
    

    sendToApp = () => {

        console.log("sendToApp chainId", typeof this.props.chainId);
        console.log("sendToApp chainId", this.props.chainId);
        

        // TODO 如果输入为空，则禁止输入
        if (this.inputRef.current?.resizableTextArea.textArea.value == "") {
            return message.info('Message content is empty.');
        }
        

        if (this.props.accounts == null || this.props.accounts.length == 0) {
            return message.info('Connect wallet to send message.');
        }

        if (this.props.chainId !== 3) {
            return message.info('Change network to Ropsten Test Network.');
        }

        // const {inputRef} = this;
        // 将textarea中的内容传给APP处理
        // console.log("input value is ", this.inputRef.current?.resizableTextArea.textArea.value);
        // console.log("input value is ", this.inputRef.current?.value);
        this.props.addPrediction(this.inputRef.current?.resizableTextArea.textArea.value);

        // TODO 上传消息后，输入栏清空
        this.setState({area: ""});

    }

    render() {
        return (
            <div className="todo-header">
                <Divider />
                {/* <p className="word">write a message</p> */}
                <TextArea id="content" value={this.state.area} ref={this.inputRef} onChange={((e) => this.setState({area: e.target.value}))} cols={10} rows={8} placeholder="Type your prediction" />
                {/* <textarea id="content" ref={this.inputRef} onChange={change2} cols={50} rows={7}/> */}
                <br />
                {/* <button onClick={this.sendToApp}>Post My Prediction</button> */}
                <Button className="button" type="primary" size="large" onClick={this.sendToApp}>Post Prediction</Button>
            </div>
        )
    }
}