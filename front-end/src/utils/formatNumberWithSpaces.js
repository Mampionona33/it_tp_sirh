// Fonction utilisée dans une composante pour formater un nombre avec des espaces.
// À utiliser uniquement pour la création de documents PDF.
// Utilisez plutôt formatAriaryMga pour la monnaie malgache dans l'affichage au sein de composants du DOM.

function formatNumberWithSpaces(number) {
  const roundedNumber = Number(number).toFixed(2)
  const formattedNumber = roundedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return formattedNumber.replace('.', ',')
}

export default formatNumberWithSpaces
