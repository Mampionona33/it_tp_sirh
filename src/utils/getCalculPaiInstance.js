import CalculPaie from './CalculPaie'

let instance = null
const getCalculPaiInstance = (salaireBase) => {
  if (!instance) {
    instance = new CalculPaie(salaireBase)
  }
  return instance
}

export default getCalculPaiInstance
