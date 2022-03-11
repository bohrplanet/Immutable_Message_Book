import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {

      // Modern dapp browsers...
      if (window.ethereum) {
        console.log("modern dapp browsers id", window.ethereum);

        window.ethereum.request({ method: 'eth_chainId' }).then(res => {
          console.log("res is ", res);

          window.ethereum.on('accountsChanged', (accounts) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            console.log("listen!");

            window.location.reload();

          });

          window.ethereum.on('chainChanged', (chainId) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            window.location.reload();
          });

          if (window.ethereum.chainId !== "0x3") {
            console.log("aaa");
            resolve(null);
          }
          else {
            const web3 = new Web3(window.ethereum);
            try {

              console.log("id is ", web3.eth.net.getId());
              // Request account access if needed
              window.ethereum.request({ method: 'eth_requestAccounts' });
              // Accounts now exposed
              resolve(web3);
            } catch (error) {
              reject(error);
            }
          }
        })
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // const provider = new Web3.providers.HttpProvider(
        //   "http://127.0.0.1:8545"
        // );
        // const web3 = new Web3(provider);
        // console.log("web3 is ", web3);
        // console.log("No web3 instance injected, using Local web3.");
        resolve(null);
      }
    });
  });

export default getWeb3;
