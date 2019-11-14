import React from 'react';

export default class Chance extends React.Component {
  render() {
    return (
      <div className="Chance">
        <div>
          胜率：{(100 * this.props.selectedCount / 6).toFixed(2)} %
        </div>
      </div>
    )
  }
}