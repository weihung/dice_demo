import React from 'react';
import dice1 from '../images/dice1.png';
import dice2 from '../images/dice2.png';
import dice3 from '../images/dice3.png';
import dice4 from '../images/dice4.png';
import dice5 from '../images/dice5.png';
import dice6 from '../images/dice6.png';

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
const style = {
  diceImage: {
    width: '20px',
    height: '20px',
  },
  fontSize: '2',
} 

export default class ChanHistoryce extends React.Component {

  showDice(nums) {
    let result = [];
    for (var i = 0; i < 6; i++) { 
      if (nums[i])
        result.push(<img src={dices[i]} style={style.diceImage} alt="dice" key={"dice" + i}/>)
    }
    return result
  }

  showHistory() {
    let result = [];
    for (var i = this.props.value.length; i > 0 ; i--){
      const element = this.props.value[i - 1]
      result.push(<tr key={"dice" + i}>
        <td align={'right'}>
        {
          this.showDice(element.number)
        }</td>
        <td><font size={style.fontSize}>${element.amount}</font></td>
        <td><font size={style.fontSize}>{element.RandomResult}</font></td>
        <td><font size={style.fontSize}>${element.winamount.toFixed(2)}</font></td>
        </tr>)
    }; 
    return result;
  }

  render() {
    return (
      <div className="History">
        <table>
          <tbody>
            <tr><td style={{width:'110px'}}></td><td><font size={style.fontSize}>下注金額</font></td><td><font size={style.fontSize}>奖号</font></td><td><font size={style.fontSize}>奖金</font></td></tr>
            {
              this.showHistory()
            }
          </tbody>
        </table>
      </div>
    )
  }
}