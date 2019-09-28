import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HightScoreInput'

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: [],
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  // Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return
    }
    if(currentPair.includes(index)){
      this.setState({currentPair: []})
      return
    }

    this.handleNewPairClosedBy(index)
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }
  // Arrow fx for binding
  displayHallOfFame = (hallOfFame) => {
    this.setState({ hallOfFame })
  }
  render() {
    const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
    const won = matchedCardIndices.length === cards.length

    return (
      <Grid container direction="column" spacing={5} className="memory">

        <Grid item xs={12} lg={6}>
          <Typography variant="h4">
            Memory Game
          </Typography>
        </Grid>

        <Grid item xs={12} lg={6}>
          <GuessCount guesses={guesses} />
        </Grid>

        <Grid container item xs={12} lg={6}>
          {cards.map((card, index) => (
            <Card 
              card={card}
              feedback={this.getFeedbackForCard(index)}
              index={index}
              key={index}
             onClick={this.handleCardClick}
            />
          ))}
        </Grid>

        <Grid item xs={12} lg={6}>
          {
            won &&
            (hallOfFame ? (
              <HallOfFame entries={hallOfFame} />
            ) : (
              <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
            ))
          }
        </Grid>
      </Grid>
    )
  }
}

export default App