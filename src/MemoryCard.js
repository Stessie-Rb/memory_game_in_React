import PropTypes from 'prop-types'
import React from 'react'

import './MemoryCard.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const HIDDEN_SYMBOL = '❓'

const MemoryCard = ({ card, feedback, index, onClick }) => (
  <Card className={`card ${feedback}`} onClick={() => onClick(index)}>
    <CardContent className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </CardContent>
  </Card>
)

MemoryCard.propTypes = {
  card: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'justMatched',
    'justMismatched',
    'visible',
  ]).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default MemoryCard