import React from 'react'
import Control from './Control'
import Timer from './Timer'

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 25 * 60,
      timerOn: false,
      onBreak: false
    }
  }

  incrementBreakLength() {
    this.setState(prevState => ({
      breakLength: prevState.breakLength + 1
    }))
  }

  decrementBreakLength() {
    this.setState(prevState => ({
      breakLength: prevState.breakLength - 1
    }))
  }

  incrementSessionLength() {
    this.setState(prevState => ({
      sessionLength: prevState.sessionLength + 1,
      timer: prevState.timer + 60
    }))
  }

  decrementSessionLength() {
    this.setState({
      breakLength: this.state.breakLength,
      sessionLength: this.state.sessionLength - 1,
      timer: this.state.timer - 60,
      timerOn: this.state.timerOn,
      onBreak: this.state.onBreak
    })
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerOn: false,
      timer: 25 * 60,
      onBreak: false
    })
    document.getElementById('beep').pause()
    clearInterval(localStorage.getItem('interval-id'))
  }

  playAudio() {
    document.getElementById('beep').currentTime = 0
    document.getElementById('beep').play()
  }

  startCounter() {
    this.setState(prevState => ({
      timerOn: !prevState.timerOn
    }))
    let second = 1000
    let date = new Date().getTime()
    let nextDate = new Date().getTime() + second
    if (!this.state.timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime()
        if (date > nextDate) {
          if (this.state.timer <= 0 && this.state.onBreak === true) {
            this.setState(prevState => ({
              timer: prevState.sessionLength * 60,
              onBreak: false
            }))
            this.playAudio()
          } else if (this.state.timer <= 0 && this.state.onBreak === false) {
            this.setState(prevState => ({
              timer: prevState.breakLength * 60,
              onBreak: true
            }))
            this.playAudio()
          } else {
            this.setState(prevState => ({
              timer: prevState.timer - 1
            }))
          }
        }
        nextDate += second
      }, 1000)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if (this.state.timerOn) clearInterval(localStorage.getItem('interval-id'))
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  render() {
    return (
      <div id="clock">
        <h1>25 + 5 Clock</h1>
        <div className="control-boxes">
          <Control
            labelId="break-label"
            labelTxt="Break Length"
            decrementId="break-decrement"
            incrementId="break-increment"
            lengthId="break-length"
            lengthTxt={this.state.breakLength}
            incrementBreakLength={this.incrementBreakLength.bind(this)}
            decrementBreakLength={this.decrementBreakLength.bind(this)}
          />
          <Control
            labelId="session-label"
            labelTxt="Session Length"
            decrementId="session-decrement"
            incrementId="session-increment"
            lengthId="session-length"
            lengthTxt={this.state.sessionLength}
            incrementSessionLength={this.incrementSessionLength.bind(this)}
            decrementSessionLength={this.decrementSessionLength.bind(this)}
          />
        </div>
        <Timer
          timeLeft={this.formatTime(this.state.timer)}
          reset={this.reset.bind(this)}
          onBreak={this.state.onBreak}
          timerOn={this.state.timerOn}
          startCounter={this.startCounter.bind(this)}
        />
        <div>
          <a
            href="https://github.com/adrianwilker"
            target="_blank"
            rel="noreferrer"
          >
            adrianwilker
          </a>
        </div>
      </div>
    )
  }
}

export default Clock
