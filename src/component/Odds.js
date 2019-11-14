import React from 'react';

export default class Odds extends React.Component {
  render() {
    return (
      <div className="odds">
        <div>
          赔率：{this.props.odds} x
        </div>
      </div>
    )
  }
}