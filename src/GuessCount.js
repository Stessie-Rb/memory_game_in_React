import PropTypes from 'prop-types'
import React from 'react'

import './GuessCount.css'

import { Typography } from '@material-ui/core';

const GuessCount = ({guesses}) =>
        <Typography variant="subtitle1" className="guesses" >
            Guesses: {guesses}
        </Typography>

GuessCount.propTypes={
    guesses: PropTypes.number.isRequired,
}
export default GuessCount