class CalculHs {
  private totalHsMois: number
  public constructor(totalHsMois: number) {
    this.totalHsMois = totalHsMois
  }

  public calculHsi130(hsni130: number): number {
    let hsi130 = 0
    if (this.totalHsMois > 18) {
      hsi130 = this.totalHsMois - hsni130
    }
    return hsi130
  }

  public calculHsi150(hsni150: number): number {
    let hsi150 = 0
    if (this.totalHsMois > 18) {
      hsi150 = this.totalHsMois - hsni150
    }
    return hsi150
  }
}

export default CalculHs
