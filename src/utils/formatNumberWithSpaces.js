// Fonction utilisée dans une composante pour formater un nombre avec des espaces.
// À utiliser uniquement pour la création de documents PDF.
// Utilisez plutôt formatAriaryMga pour la monnaie malgache dans l'affichage au sein de composants du DOM.

function formatNumberWithSpaces(number) {
  const formattedNumber = number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '0,00'

  return formattedNumber.replace('.', ',')
}

export default formatNumberWithSpaces
