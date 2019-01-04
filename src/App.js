import React, { Component } from 'react';
import './App.css';
import './serialize';
import Transport from "@ledgerhq/hw-transport-u2f";
const Api = require('./ledger').default;

class App extends Component {
  async runme(){
    let transport = await Transport.create();
    const eos = new Api(transport)

    const signBuf = Buffer.concat([
      new Buffer("cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f", "hex"), new Buffer("64952f5c252a051e76d8000000000100a6823403ea3055000000572d3ccdcd0170154b2a5ec5928a00000000a8ed32322670154b2a5ec5928a3044286488e0af91102700000000000004454f530000000005546573743100", "hex"), new Buffer(new Uint8Array(32)),
    ]);
    const signBufHex = signBuf.toString('hex');
    // Or try a full transacton which has already got the chainid appended to it
    //const signdata = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f4eb02f5cb85f31f96953000000000100a6823403ea3055000000572d3ccdcd01405d76789a9b315500000000a8ed323221405d76789a9b31553044286488e0af91102700000000000004454f530000000000000000000000000000000000000000000000000000000000000000000000000000";
    let signedTxn = await eos.signTransaction("44'/194'/0'/0/0",signBufHex);
    console.log(signedTxn);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.runme}>Run Me</button>
      </div>
    );
  }
}

export default App;
