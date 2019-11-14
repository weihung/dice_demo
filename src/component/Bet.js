import React from 'react'

const step = 0.01;
const min = 0.01;
const style = {
  inputText:{ 
    fontSize: '30px',
    width: '140px',
  },
  button:{ 
    fontSize: '30px',
  },
}

export default class Bet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleLess = this.handleLess.bind(this);
  }

  handleChange(event) {
    var value = parseFloat(event.target.value);
    var v = value.toFixed(2);
    if (v < min){
      v = min;
    }
    this.props.onChange(v);
    this.setState({value: parseFloat(v)});
  }

  handleMore() {
    var value = parseFloat(this.state.value) + step;
    value = parseFloat(value.toFixed(2));
    this.props.onChange(value);
    this.setState({value: value});
  }

  handleLess() {
    var value = parseFloat(this.state.value) - step;
    if (value < 0.01) value = 0.01;
    value = parseFloat(value.toFixed(2));
    this.props.onChange(value);
    this.setState({value: value});
  }

  render() {
    return(
      <div>
        <button style={style.button} onClick={this.handleMore}>
          +
        </button>
        {/* <form> */}
          <input type="number" style={style.inputText} value={this.state.value} onChange={this.handleChange} />
        {/* </form> */}
        <button style={style.button}  onClick={this.handleLess}>
          -
        </button>
      </div>
    )
  }
}