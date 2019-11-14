import React from 'react';
import selected_dice1 from '../images/dice1.png';
import selected_dice2 from '../images/dice2.png';
import selected_dice3 from '../images/dice3.png';
import selected_dice4 from '../images/dice4.png';
import selected_dice5 from '../images/dice5.png';
import selected_dice6 from '../images/dice6.png';
import dice1 from '../images/gray_dice1.png';
import dice2 from '../images/gray_dice2.png';
import dice3 from '../images/gray_dice3.png';
import dice4 from '../images/gray_dice4.png';
import dice5 from '../images/gray_dice5.png';
import dice6 from '../images/gray_dice6.png';
import './SelectDice.css';

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
const selected_dices = [selected_dice1, selected_dice2, selected_dice3, selected_dice4, selected_dice5, selected_dice6];
  
export default class SelectDice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  
  clickDice(select) {
    var selected = this.state.selected ^ (1 << select);
    if (selected < 1) return;
    // if selected count large 5 should return;
    var count = 0;
    for (var i = 0; i < 6; i++) {
      if (selected & (1 << i)) count += 1;
    }
    if (count > 5) return;

    this.props.onChange({selected: selected, selectedCount:count});
    this.setState({selected:selected});
  }

  render() {
    return (
      <div className="select-dice">
        <div>
          <img src={this.state.selected & 1 ? selected_dices[0] : dices[0]} className="dice 1" alt="dice1" onClick={()=>this.clickDice(0)} />
          <img src={this.state.selected & (1 << 1) ? selected_dices[1] : dices[1]} className="dice 2" alt="dice2" onClick={()=>this.clickDice(1)}/>
          <img src={this.state.selected & (1 << 2) ? selected_dices[2] : dices[2]} className="dice 3" alt="dice3" onClick={()=>this.clickDice(2)}/>
        </div>
        <div>
          <img src={this.state.selected & (1 << 3) ? selected_dices[3] : dices[3]} className="dice 4" alt="dice4" onClick={()=>this.clickDice(3)}/>
          <img src={this.state.selected & (1 << 4) ? selected_dices[4] : dices[4]} className="dice 5" alt="dice5" onClick={()=>this.clickDice(4)}/>
          <img src={this.state.selected & (1 << 5) ? selected_dices[5] : dices[5]} className="dice 6" alt="dice6" onClick={()=>this.clickDice(5)}/>
        </div>
      </div>
    );
  }
}

