import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  table: {
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  col: {
    flexDirection: 'column',
    display: 'flex',
  },
  borderRight: {
    borderRight: 2,
  },
  borderBottom: {
    borderBottom: 2,
  },
  borderTop: {
    borderTop: 2,
  },
  header: {
    fontSize: 11,
    justifyContent: 'center',
    textTransform: 'uppercase',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    borderTop: 2,
  },
  subTitle: {
    textAlign: 'left',
    paddingLeft: 3,
    textTransform: 'capitalize',
  },
  cell: {
    paddingRight: 3,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 10,
  },
  textRight: {
    textAlign: 'right',
    paddingRight: 3,
  },
  sousTotal: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },

  textBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textMedium: {
    fontFamily: 'Roboto',
    fontWeight: 'medium',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  textBoldItalic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
})
