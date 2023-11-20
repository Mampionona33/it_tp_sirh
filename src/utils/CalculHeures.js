class CalculHeures {
  constructor(data) {
    this.data = data
    this.totalHs130 = this.calculTotalHs130()
    this.totalHs150 = this.calculTotalHs150()
    this.dataWithTotals = this.ajouterTotalsAuLundi()
    this.formatedData = this.formatDataForDisplay()
    this.totalHn = 0
    this.hn = null
    this.hs = null
    this.hdim = null
    this.hs = null
    this.hs130 = null
    this.hs150 = null
  }

  calculTotalHs130() {
    return this.data.reduce((total, item) => total + item.hs_normale, 0)
  }

  calculTotalHs150() {
    return this.data.reduce((total, item) => total + item.hs150, 0)
  }

  ajouterTotalsAuLundi() {
    const dataWithTotals = [...this.data]
    const lundiIndex = dataWithTotals.findIndex((item) => item.jour === 'Lundi')
    if (lundiIndex !== -1) {
      dataWithTotals[lundiIndex].hs130 = this.totalHs130
      dataWithTotals[lundiIndex].hs150 = this.totalHs150
    }
    return dataWithTotals
  }

  formatDataForDisplay() {
    return this.dataWithTotals.map((item) => {
      const shouldDisplayColumn = item.jour !== 'Dimanche' || item.hs_jours_feries !== 0
      console.log(item)

      if (item.jour !== 'Dimanche') {
        this.hn =
          item.heure_de_travail >= item.heure_normale ? item.heure_normale : item.heure_de_travail
        this.hs =
          item.heure_de_travail >= item.heure_normale
            ? item.heure_de_travail - item.heure_normale
            : null
      } else {
        this.hdim = this.hs_de_dimanche
        this.hn = null
        this.hs = null
      }

      if (this.hn === 0) {
        this.hn = null
      }
      if (this.hs === 0) {
        this.hs = null
      }
      if (this.hdim === 0) {
        this.hdim = null
      }

      return {
        date: item.date,
        jour: item.jour,
        hn: this.hn,
        hs: this.hs,
        hs130: null,
        hs150: null,
        hsn30: null,
        hsn50: null,
        hdim: this.hdim,
        hferie: null,
      }
    })
  }
}

export default CalculHeures
