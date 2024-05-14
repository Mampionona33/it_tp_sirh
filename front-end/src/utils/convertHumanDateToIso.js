const convertHumanDateToIso = (hummanReadableDate) => {
  const out = new Date(String(hummanReadableDate).split('/').reverse().join('-'))
  return out
}
export default convertHumanDateToIso
