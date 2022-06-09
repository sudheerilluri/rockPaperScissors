import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import './index.css'

class Game extends Component {
  state = {totalScore: 0, scoreBoard: false, status: '', your: '', rand: ''}

  getScoreBoard = event => {
    const {choice} = this.props
    const you = event.target.id
    console.log(event)
    const choiceLength = choice.length
    const random = choice[Math.floor(Math.random() * choiceLength)].id
    if (you === choice[2].id && random === choice[0].id) {
      this.setState(prevState => ({
        status: 'YOU WON',
        scoreBoard: true,
        totalScore: prevState.totalScore + 1,
        your: you,
        rand: random,
      }))
    } else if (you === choice[1].id && random === choice[0].id) {
      this.setState(prevState => ({
        status: 'YOU LOSE',
        scoreBoard: true,
        totalScore: prevState.totalScore - 1,
        your: you,
        rand: random,
      }))
    } else if (you === choice[0].id && random === choice[2].id) {
      this.setState(prevState => ({
        status: 'YOU LOSE',
        scoreBoard: true,
        totalScore: prevState.totalScore - 1,
        your: you,
        rand: random,
      }))
    } else if (you === choice[1].id && random === choice[2].id) {
      this.setState(prevState => ({
        status: 'YOU WON',
        scoreBoard: true,
        totalScore: prevState.totalScore + 1,
        your: you,
        rand: random,
      }))
    } else if (you === choice[0].id && random === choice[1].id) {
      this.setState(prevState => ({
        status: 'YOU WON',
        scoreBoard: true,
        totalScore: prevState.totalScore + 1,
        your: you,
        rand: random,
      }))
    } else if (you === choice[2].id && random === choice[1].id) {
      this.setState(prevState => ({
        status: 'YOU LOSE',
        scoreBoard: true,
        totalScore: prevState.totalScore - 1,
        your: you,
        rand: random,
      }))
    } else if (you === random) {
      this.setState(prevState => ({
        status: 'IT IS DRAW',
        scoreBoard: true,
        totalScore: prevState.totalScore,
        your: you,
        rand: random,
      }))
    }
  }

  renderGame = () => {
    const {choice} = this.props
    return (
      <ul className="image-container">
        <li key={choice[0].id}>
          <button
            type="button"
            className="img-btn"
            id={choice[0].id}
            onClick={this.getScoreBoard}
            data-testid="rockButton"
          >
            <img
              src={choice[0].imageUrl}
              alt={choice[0].id}
              className="img"
              id={choice[0].id}
            />
          </button>
          <button
            type="button"
            className="img-btn"
            key={choice[1].id}
            onClick={this.getScoreBoard}
            data-testid="scissorsButton"
          >
            <img
              src={choice[1].imageUrl}
              alt={choice[1].id}
              className="img"
              id={choice[1].id}
            />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="img-btn"
            key={choice[2].id}
            onClick={this.getScoreBoard}
            data-testid="paperButton"
          >
            <img
              src={choice[2].imageUrl}
              alt={choice[2].id}
              className="img"
              id={choice[2].id}
            />
          </button>
        </li>
      </ul>
    )
  }

  onPlayAgain = () => {
    this.setState({scoreBoard: false})
  }

  renderScoreView = () => {
    const {status, your, rand} = this.state
    const {choice} = this.props
    const yourUrl = choice.filter(each => each.id === your)
    const randUrl = choice.filter(each => each.id === rand)

    return (
      <>
        <ul className="score-container">
          <li>
            <h1>YOU</h1>
            <img src={yourUrl[0].imageUrl} alt="your choice" className="img" />
          </li>
          <li>
            <h1>OPPONENT</h1>
            <img
              src={randUrl[0].imageUrl}
              alt="opponent choice"
              className="img"
            />
          </li>
        </ul>
        <p className="scoreval">{status}</p>
        <button type="button" onClick={this.onPlayAgain}>
          PLAY AGAIN
        </button>
      </>
    )
  }

  render() {
    const {totalScore, scoreBoard} = this.state

    return (
      <div className="main-container">
        <div className="sub-div">
          <div className="header">
            <div>
              <h1 className="heading">ROCK PAPER SCISSORS</h1>
            </div>
            <div className="score">
              <p className="score-text">Score</p>
              <p className="scoreval">{totalScore}</p>
            </div>
          </div>
          {scoreBoard ? this.renderScoreView() : this.renderGame()}
          <Popup
            modal
            trigger={
              <div className="btn">
                <button type="button" className="rules">
                  RULES
                </button>
              </div>
            }
          >
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt=" rules"
                className="rulesimage"
              />
            </div>
          </Popup>
        </div>
      </div>
    )
  }
}

export default Game
