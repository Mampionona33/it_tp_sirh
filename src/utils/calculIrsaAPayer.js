export default class IrsaAPayer {
  constructor(imposableArrondi) {
    this.imposableArrondi = imposableArrondi
    this.value = 0
    this.calculIrsaTranche()
  }

  isTranche0() {
    return this.imposableArrondi <= 350000
  }

  isTranche1() {
    return this.imposableArrondi >= 350001 && this.imposableArrondi <= 400000
  }
  isTranche2() {
    return this.imposableArrondi >= 400001 && this.imposableArrondi <= 500000
  }

  isTranche3() {
    return this.imposableArrondi >= 500001 && this.imposableArrondi <= 600000
  }

  calculIrsaTranche() {
    if (this.isTranche0()) {
      this.value = 0
    } else if (this.isTranche1()) {
      this.value = (this.imposableArrondi - 350000) * 0.05
    } else if (this.isTranche2()) {
      this.value = 50000 * 0.05 + (this.imposableArrondi - 400000) * 0.1
    } else if (this.isTranche3()) {
      this.value = 50000 * 0.05 + 100000 * 0.1 + (this.imposableArrondi - 500000) * 0.15
    } else {
      this.value =
        50000 * 0.05 + 100000 * 0.1 + 100000 * 0.15 + (this.imposableArrondi - 600000) * 0.2
    }

    if (this.value < 2000) {
      this.value = 2000
    }
  }

  get irsaValue() {
    return this.value
  }
}
