class CalculHeures {
  constructor(data) {
    this.data = data
    this.totalHs130 = this.calculTotalHs130()
    this.totalHs150 = this.calculTotalHs150()
    this.dataWithTotals = this.ajouterTotalsAuLundi()
    this.formatedData = this.formatDataForDisplay()
    this.totalHn = 0
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

      const hs =
        item.heure_de_travail >= item.heure_normale
          ? item.heure_de_travail - item.heure_normale
          : null

      const hn = item.heure_de_travail >= item.heure_normale ? 8 : item.heure_de_travail

      return {
        date: item.date,
        jour: item.jour,
        hn: hn,
        hs: hs,
        hs130: null,
        hs150: null,
      }
    })
  }
}

export default CalculHeures
