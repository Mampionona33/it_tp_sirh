import React from 'react'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import { Component } from 'react'

class DnsGen extends Component {
  handleGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('Download logic will be implemented here')
  }
  render() {
    return (
      <div>
        <ButtonWithIcon label="Générer" onClick={this.handleGenerate} />
      </div>
    )
  }
}

export default DnsGen
