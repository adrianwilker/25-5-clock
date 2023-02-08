import React from 'react'

class Control extends React.Component {
  changeTime(event) {
    var lengthDiv = document.getElementById(this.props.lengthId).innerText
    if (Number(lengthDiv) > 1) {
      if (event.target.id === 'break-decrement')
        this.props.decrementBreakLength()
      else if (event.target.id === 'session-decrement')
        this.props.decrementSessionLength()
    }
    if (Number(lengthDiv) < 60) {
      if (event.target.id === 'break-increment')
        this.props.incrementBreakLength()
      else if (event.target.id === 'session-increment')
        this.props.incrementSessionLength()
    }
  }

  render() {
    return (
      <div className="control-grid">
        <div className="label" id={this.props.labelId}>
          {this.props.labelTxt}
        </div>
        <button
          className="control-buttons control-button-right"
          id={this.props.decrementId}
          value="-"
          title="-1 minute"
          onClick={event => this.changeTime(event)}
        >
          -
        </button>
        <div className="control-button-label" id={this.props.lengthId}>
          {this.props.lengthTxt}
        </div>
        <button
          className="control-buttons control-button-left"
          id={this.props.incrementId}
          value="+"
          title="+1 minute"
          onClick={event => this.changeTime(event)}
        >
          +
        </button>
      </div>
    )
  }
}

export default Control
