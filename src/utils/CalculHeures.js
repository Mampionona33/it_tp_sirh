import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isMonday,
  isSunday,
  isSaturday,
  setDefaultOptions,
  parse,
} from 'date-fns'

class CalculHeures {
  constructor(data) {
    this.data = data
    this.formatedData = this.formatDataForDisplay()
    this.totalHn = 0
    this.hn = null
    this.hs = null
    this.hdim = null
    this.hs = null
    this.hsDetails = []
    this.totalHsParSemaine = null
    this.hsParSemaine = 0
    this.currentWeekStartDate = null
  }

  calculateHsTotalParSemaine() {
    let currentWeekStartDate = null
    let weeklyOvertimeHours = 0
    this.hsDetails = []

    this.data.forEach((item, index) => {
      const currentDate = new Date(item.date)
      const isLastDayOfMonth = index === this.data.length - 1
      const hsValue =
        item.heure_de_travail >= item.heure_normale
          ? item.heure_de_travail - item.heure_normale
          : null

      if (isMonday(currentDate)) {
        this.currentWeekStartDate = currentDate
        weeklyOvertimeHours = 0
      }

      if (this.currentWeekStartDate) {
        weeklyOvertimeHours += hsValue

        if (isSunday(currentDate) || isLastDayOfMonth) {
          this.hsDetails.push({
            date: item.date,
            hs130: Math.round(weeklyOvertimeHours) <= 8 ? weeklyOvertimeHours : 8,
            hs150: Math.min(2, weeklyOvertimeHours - 8),
          })
        }
      }
    })
  }

  formatDataForDisplay() {
    // let currentWeekStartDate = null
    // let hsParSemaine = 0
    this.hsDetails = []

    return (
      this.data &&
      this.data.map((item) => {
        const shouldDisplayColumn = item.jour !== 'Dimanche' || item.hs_jours_feries !== 0
        const isLastDayOfMonth = item === this.data.length - 1

        if (item.jour !== 'Dimanche') {
          this.hn =
            item.heure_de_travail >= item.heure_normale ? item.heure_normale : item.heure_de_travail
          this.hs =
            item.heure_de_travail >= item.heure_normale
              ? item.heure_de_travail - item.heure_normale
              : null

          this.hs ? (this.hs = parseInt(this.hs.toFixed(1))) : (this.hs = null)

          if (item.jour === 'Lundi') {
            this.currentWeekStartDate = item.date
          }
          if (this.currentWeekStartDate) {
            this.hsParSemaine += this.hs
            console.log(this.hsParSemaine)
          }
        } else {
          this.hdim = this.hs_de_dimanche
          this.hn = null
          this.hs = null
        }

        this.hs130 = this.hsParSemaine >= 8 ? 8 : this.hsParSemaine
        this.hs150 = this.hsParSemaine > 8 ? Math.min(2, this.hsParSemaine - 8) : null

        if (item.jour === 'Dimanche' || isLastDayOfMonth) {
          this.hsParSemaine = null
        }

        if (this.hn <= 0) {
          this.hn = null
        }
        if (this.hs === 0) {
          this.hs = null
        }
        if (this.hdim === 0) {
          this.hdim = null
        }
        if (this.hs130 <= 0) {
          this.hs130 = null
        }

        return {
          date: item.date,
          jour: item.jour,
          hn: this.hn,
          hs: this.hs,
          hs130: this.hs130,
          hs150: this.hs150,
          hsn30: null,
          hsn50: null,
          hdim: this.hdim,
          hferie: null,
        }
      })
    )
  }
}

export default CalculHeures
