import PropTypes from 'prop-types'

const formatAriaryMga = (number) => {
  return new Intl.NumberFormat('fr', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'MGA',
    currencyDisplay: 'narrowSymbol',
  }).format(number)
}

formatAriaryMga.propTypes = {
  number: PropTypes.number.isRequired,
}

export default formatAriaryMga
