class CalculHeures {
  constructor(data) {
    this.data = data
    this.totalHs130 = this.calculTotalHs130()
    this.totalHs150 = this.calculTotalHs150()
    this.dataWithTotals = this.ajouterTotalsAuLundi()
    this.formatedData = this.formatDataForDisplay()
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
      return {
        date: item.date,
        jour: item.jour,
        Hn: item.heure_de_travail,
        Hs: item.hs,
        hs130: shouldDisplayColumn ? (item.jour === 'Lundi' ? this.totalHs130 : '') : '',
        hs150: shouldDisplayColumn ? (item.jour === 'Lundi' ? this.totalHs150 : '') : '',
        // ... (ajoutez d'autres colonnes au besoin)
      }
    })
  }
}

export default CalculHeures
