import React, { Component } from "react";
import Impmb from "./contracts/Impmb.json";
import getWeb3 from "./getWeb3";
import Add from "./components/Add"
import List from "./components/List"

import "./App.css";

class App extends Component {

  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    result: null,
    predictions: []
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Impmb.networks[networkId];
      const instance = new web3.eth.Contract(
        Impmb.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getTopic);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
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

    // 调用合约的方法
    await contract.methods.postPrediction("test", value).send({ from: accounts[0], gas: 1000000 });

    // 将输入框清空
    // document.getElementById("title").value = "";
    // document.getElementById("content").value = ""

    this.getTopic()

  };

  addPrediction = async (prediction_value) => {

    console.log("prediction_value is ", prediction_value);

    this.postTopic(prediction_value);
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

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

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

        <h1 className="Head">Immutable Message Book</h1>

        <p className="Info">This is a blockchain-based message book. The feature of this message book is that once a message is posted on the blockchain,
          it cannot be deleted or changed. I will apply this guestbook to my predictions about the digital currency market. Through this guestbook,
          I can certify that my predictions have not been deleted, or changed.</p>

        <List todos={this.state.predictions} />
        <Add addPrediction={this.addPrediction} />

      </div>
    );
  }
}

export default App;
