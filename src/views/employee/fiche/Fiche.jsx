import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('infos')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const params = useParams()
  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey)
  }
  React.useEffect(() => {
    let mount = true
    if (params) {
      if (mount) {
        console.log(params)
        setSelectedEmployee(params.id)
      }
    }
    return () => {
      mount = false
    }
  }, [params])

  return (
    <>
      <div className="card h-100">
        <div className="card-header">Fiche employé</div>
        <div className="card-body">
          {/* Onglets */}
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                type="button"
                id="controlled-tab-example-tab-infos"
                role="tab"
                aria-controls="controlled-tab-example-tabpane-infos"
                aria-selected={activeTab === 'infos'}
                className={`nav-link ${activeTab === 'infos' ? 'active' : ''}`}
                onClick={() => handleTabClick('infos')}
              >
                Information générale
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                id="controlled-tab-example-tab-hrsNormal"
                role="tab"
                aria-controls="controlled-tab-example-tabpane-hrsNormal"
                aria-selected={activeTab === 'hrsNormal'}
                className={`nav-link ${activeTab === 'hrsNormal' ? 'active' : ''}`}
                onClick={() => handleTabClick('hrsNormal')}
              >
                Heures normales
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                id="controlled-tab-example-tab-heuresSup"
                role="tab"
                aria-controls="controlled-tab-example-tabpane-heuresSup"
                aria-selected={activeTab === 'heuresSup'}
                className={`nav-link ${activeTab === 'heuresSup' ? 'active' : ''}`}
                onClick={() => handleTabClick('heuresSup')}
              >
                Heures supplémentaires
              </button>
            </li>
          </ul>
          {/* Contenu des onglets */}
          <div className="tab-content">
            <div
              className={`tab-pane fade ${activeTab === 'infos' ? 'show active' : ''}`}
              id="controlled-tab-example-tabpane-infos"
            >
              Information générale {selectedEmployee}
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'hrsNormal' ? 'show active' : ''}`}
              id="controlled-tab-example-tabpane-hrsNormal"
            >
              Heures normales {selectedEmployee}
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'heuresSup' ? 'show active' : ''}`}
              id="controlled-tab-example-tabpane-heuresSup"
            >
              Heures supplémentaires {selectedEmployee}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Fiche
