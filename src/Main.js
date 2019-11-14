import React from 'react';
import SelectDice from './component/SelectDice';
import Odds from './component/Odds';
import Chance from './component/Chance';
import Bet from './component/Bet';
import History from './component/History';
import Switch from "react-switch";
import Chart from './component/Chart';

const odds = [0, 5.88, 2.94, 1.96, 1.47, 1.18]
const minBet = 0.01;

const style = {
  div: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  divBet: {
    marginTop: '40px',
  },
  button: {
    marginTop: '10px',
    fontSize: '30px',
  },
  div1: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  div2: {
    display: 'inline-flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'center'
  }
}

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      selectedCount: 1,
      disableBet: false,
      history: [],
      autoBet: false,
      buttonText: '下注',
      amount: 100,
      betTime: 0,
      amountHistory: [100],
    };
    this.bet = minBet;
    this.shouldStop = false;
    this.handleAutoBetChange = this.handleAutoBetChange.bind(this);
    this.handleAutoBetChange = this.handleAutoBetChange.bind(this);
  }

  handleAutoBetChange = (checked) => {
    this.setState({...this.state, autoBet: checked});
  }

  callBetApi() {
    const url = "https://dicedemo.herokuapp.com/PlayRollADice"
    var numbers = []
    var bet = parseFloat(this.bet);
    if (this.state.amount < bet) {
      this.setState({...this.state, 
        buttonText: '下注',
      })
      return
    }
    for (var i = 0; i < 6; i++) { 
      if (this.state.selected & (1 << i)){
        numbers.push(1);
      } else {
        numbers.push(0);
      }
    }
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: numbers,
        amount: bet,
      })
    }
    fetch(url, option)
    .then((response) => {
      return response.json()
    })
    .then((jsonData) => {
      this.betTime ++;
      var history = this.state.history;
      history.push(jsonData);
      if (history.length > 10) history = history.slice(history.length - 10)
      var amount = this.state.amount - bet + jsonData.winamount
      amount = parseFloat(amount.toFixed(2))
      var amountHistory = this.state.amountHistory
      amountHistory.push(amount)
      this.setState({...this.state, disableBet: false, history: history, amount: amount, betTime: this.state.betTime + 1, amountHistory: amountHistory});
      if (!this.shouldStop && this.state.autoBet) {
        this.callBetApi()
      } else {
        this.setState({...this.state, 
          buttonText: '下注',
        });
      }
    })
    .catch((err) => {
      window.alert(err);
      this.setState({...this.state, disableBet: false});
      if (!this.shouldStop && this.state.autoBet) {
        this.callBetApi()
      } else {
        this.setState({...this.state, 
          buttonText: '下注',
        });
      }
    })
  }

  handleBetClick = (event) => {
    this.shouldStop = this.state.buttonText === '停止'
    this.setState({...this.state, 
      disableBet: true && !this.state.autoBet,
      buttonText: this.state.autoBet ? '停止' : '下注',
    });
    this.callBetApi()
  }

  render() {
    return (
      <div  style={style.div1}>
        <div style={style.div2}>
        <div style={style.div1}>
          <div>
            目前金额：{this.state.amount}
          </div>
          <div>
            下注次数：{this.state.betTime}
          </div>
          <div>
          < Odds odds={odds[this.state.selectedCount]} />
          </div>
          <div>
            <Chance selectedCount={this.state.selectedCount} />
          </div>
          
          <div >
            <SelectDice selected={this.state.selected} onChange=
              {
                (selectResult) => {
                  this.setState({...this.state, ...selectResult});
            }}/>
          </div>
          
          <div style={style.div}>
            <Bet value={this.bet} onChange={(value) => {
              this.bet = value;
            }}/>
          </div>
          <div style={style.div}>
            <div>
              <label>
                <span>自动下注</span>
                <Switch 
                  onChange={this.handleAutoBetChange} 
                  checked={this.state.autoBet} 
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"/>
              </label>
            </div>
            <div>
              <button style={style.button} onClick={this.handleBetClick} disabled={this.state.disableBet}> 
                {this.state.buttonText}
              </button>
            </div>
          </div>
        </div>
        <div tyle={style.div1}>
          <div>投注记录</div>
          <History value={this.state.history} />
        </div>
        </div>
      
      <div>
        <Chart value={this.state.amountHistory} />
      </div>
      </div>
    )
  }
}