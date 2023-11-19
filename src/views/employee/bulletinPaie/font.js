// fonts.js
import { Font } from '@react-pdf/renderer'
import RobotoItalic from 'src/assets/fonts/Roboto/Roboto-Italic.ttf'
import RobotoBoldItalic from 'src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'
import RobotoBold from 'src/assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from 'src/assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoMedium from 'src/assets/fonts/Roboto/Roboto-Medium.ttf'

const registerFonts = () => {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: RobotoRegular },
      { src: RobotoItalic, fontStyle: 'italic' },
      { src: RobotoBold, fontWeight: 'bold', fontStyle: 'normal' },
      { src: RobotoMedium, fontWeight: 'bold', fontStyle: 'medium' },
      { src: RobotoBoldItalic, fontStyle: 'italic', fontWeight: 'bold' },
    ],
  })
}

export default registerFonts
