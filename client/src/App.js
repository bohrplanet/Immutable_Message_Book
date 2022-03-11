import React, { Component } from "react";
import Impmb from "./contracts/Impmb.json";
import getWeb3 from "./getWeb3";
import Add from "./components/Add"
import List from "./components/List"
import { Divider, Modal, message, notification } from 'antd';

import "./App.css";

class App extends Component {

  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    result: null,
    chainId: null,
    predictions: [],
    isModalVisible: false,
    setIsModalVisible: false,
    setIsModalVisible_network: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("getweb3", web3);
      this.setState({ web3 });
      if (!window.ethereum) {
        this.setState({ setIsModalVisible: true });
      } else if (!web3) {
        this.setState({ setIsModalVisible_network: true });
      }

      if (web3) {
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Impmb.networks[networkId];
        const instance = new web3.eth.Contract(
          Impmb.abi,
          deployedNetwork && deployedNetwork.address,
        );

        console.log("accounts is", accounts);
        console.log("networkId is", networkId);
        console.log("deployedNetwork is", deployedNetwork);
        console.log("instance is ", instance);

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance, chainId: networkId }, this.getTopic);
      }


    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
      console.error(error);
    }
  };

  getTopic = async () => {

    const { contract } = this.state;

    // const { getCount } = contract.methods;
    const count = await contract.methods.getCount().call();

    console.log("count is ", count);

    // this.setState({result: "ddd"});

    // console.log("this.state.result is ", this.state.result);

    let result = [];

    let i = 0;
    for (i = 0; i < count; i++) {
      // 获得合约对象的属性
      // 由于这是一个异步任务，所以需要添加
      await contract.methods.topics(i).call().then(function (topic) {
        const title = topic[0];
        const content = topic[1];
        const owner = topic[2];
        const timestamp = topic[3];

        // console.log("title is ", title);
        // console.log("content is ", content);
        // console.log("owner is ", owner);
        // console.log("ts is ", timestamp);
        // console.log("this is ",);

        result.push({ id: i, content, owner, timestamp });

        // this.setState(result +=  `<li>${title} | ${content} | ${owner} | ${ts}</li>`);

        // result += `<li>${title} | ${content} | ${owner} | ${ts}</li>`;

        // console.log("result is ", result);

      })
    }

    console.log(" overall result is ", result);


    this.setState({ predictions: result });

  };

  postTopic = async (value) => {

    console.log("postTopic");

    const { accounts, contract } = this.state;

    console.log("postTopic accounts", accounts);

    console.log("postTopic value is ", value);
    // const title = document.getElementById("title").value;
    // const content = document.getElementById("content").value;
    // console.log("input1 is ", input1);
    // console.log("input2 is ", input2);

    // // 当输入为空的时候，弹出提示
    // if (title === "" || content === "") {
    //   alert("input someting.");
    //   return;
    // }

    let reject_flag = false;

    // 调用合约的方法
    await contract.methods.postPrediction("test", value).send({ from: accounts[0], gas: 1000000 }).then(res => {
      console.log("res", res);
    }).catch(error => {
      console.log("error", error);
      if (error.code == 4001) {
        console.log("d");
        reject_flag = true;
        return message.warning('Rejected to send message!');
      }
    });

    // use notification when massage deployed on the blockchain
    if (!reject_flag) {
      notification.success({
        message: `Success!`,
        description:
          'Message is on the Blockchain Now!'
      });
    }

    // 将输入框清空
    // document.getElementById("title").value = "";
    // document.getElementById("content").value = ""

    this.getTopic()

  };

  addPrediction = async (prediction_value) => {

    console.log("prediction_value is ", prediction_value);

    // if account is empty, then don't post.
    console.log("accounts is ", this.state.accounts.length);

    if (this.state.accounts.length != 0) {
      this.postTopic(prediction_value);
    } else {
      return message.info('Connect wallet to send message.');
    }


  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  handleOk = () => {
    // this.setState({ setIsModalVisible: false });
    window.open("https://metamask.io/");
  };

  handleCancel = () => {
    this.setState({ setIsModalVisible: false });
  };

  handleOk_network = () => {
    this.setState({ setIsModalVisible_network: false });
  };

  handleCancel_network = () => {
    this.setState({ setIsModalVisible_network: false });
  };


  render() {

    return (
      <div className="App">
        <Modal title={<span style={{ fontSize: '18px', color: '#1890ff' }}> Connect to a wallet</span>} style={{ top: 300 }} visible={this.state.setIsModalVisible} onOk={this.handleOk} okText="Open MetaMask" onCancel={this.handleCancel}>
          <p style={{ fontSize: '16px', color: '#1890ff' }}>You'll need to install <b>MetaMask</b> to continue. Once you installed it, refresh the page please.</p>
        </Modal>

        <Modal title={<span style={{ fontSize: '18px', color: '#1890ff' }}> Connect wallet to Ropsten Network</span>} footer={null} style={{ top: 400 }} maskClosable={false} closable={false} visible={this.state.setIsModalVisible_network} >
          <p style={{ fontSize: '16px', color: '#1890ff' }}>You'll need to change network to Ropsten Test Network.</p>
        </Modal>

        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: </div> */}

        <h1 className="Head">Blockchain Message Book</h1>

        <p className="Info">make your prediction Immutable</p>
        <Divider />
        <List todos={this.state.predictions} />
        <Add addPrediction={this.addPrediction} accounts={this.state.accounts} chainId={this.state.chainId}/>

      </div>
    );
  }
}

export default App;
