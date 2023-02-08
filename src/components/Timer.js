import React from 'react'

class Timer extends React.Component {
  render() {
    return (
      <div id="timer">
        <div id="timer-label">
          {this.props.onBreak ? <span>Break</span> : <span>Session</span>}
        </div>
        <div id="time-left"> {this.props.timeLeft} </div>
        <div id="timer-control">
          <button id="start_stop" onClick={this.props.startCounter}>
            {this.props.timerOn ? (
              <i className="small material-icons" title="pause">
                pause
              </i>
            ) : (
              <i className="small material-icons" title="play">
                play_arrow
              </i>
            )}
          </button>
          <button id="reset" onClick={this.props.reset} title="restart">
            <i className="small material-icons">restore</i>
          </button>
          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            preload="auto"
          ></audio>
        </div>
      </div>
    )
  }
}

export default Timer
