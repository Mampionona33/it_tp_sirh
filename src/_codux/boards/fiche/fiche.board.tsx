import React from 'react'
import { createBoard } from '@wixc3/react-board'
import Fiche from '../../../views/employee/fiche/Fiche'

export default createBoard({
  name: 'fiche',
  Board: () => (
    <div>
      <Fiche />
    </div>
  ),
  isSnippet: true,
  environmentProps: {
    windowHeight: 495,
  },
})
