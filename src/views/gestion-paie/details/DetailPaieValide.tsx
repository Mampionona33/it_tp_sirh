import React from 'react'
import CardSalaireBrut from '../valider-paie/ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from '../valider-paie/ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from '../valider-paie/ValiderCalculPaie/CardSalaireNetAPayer'

const DetailPaieValide = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
        <CardSalaireBrut />
        <CardSalaireNet />
        <CardSalaireNetAPayer />
      </div>
    </div>
  )
}

export default DetailPaieValide
