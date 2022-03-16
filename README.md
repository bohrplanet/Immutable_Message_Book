# Immutable Message Book

This is a blockchain-based message book.  
The feature of this message book is that once a message is posted on the blockchain, it cannot be deleted or changed.  
I will apply this guestbook to my predictions about the digital currency market.  
Through this guestbook, I can certify that my predictions have not been deleted, or altered.

Todo List:
1. display data from new to old.
2. popup notification when send a transaction, use on("transactionHash", function()). or
we can use send({ from: accounts[0], gas: 1000000 }, function() {}).
refer to http://cw.hubwiz.com/card/c/web3.js-1.0/1/4/9/