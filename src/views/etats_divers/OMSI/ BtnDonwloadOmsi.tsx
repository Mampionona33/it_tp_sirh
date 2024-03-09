import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { IBtnDownloadOmsiProps } from '@src/interfaces/interfaceBtnDownloadOmsi'
import React from 'react'

const BtnDonwloadOmsi: React.FC<IBtnDownloadOmsiProps> = ({ data }) => {
  const handleDownload = () => {}
  console.log(data)

  return (
    <div>
      <ButtonWithIcon
        className="w-24"
        label="Télécharger"
        onClick={handleDownload}
        disabled={!data || data.length === 0}
        variant={ButtonWithIconVariant.Secondary}
      />
    </div>
  )
}

export default BtnDonwloadOmsi
