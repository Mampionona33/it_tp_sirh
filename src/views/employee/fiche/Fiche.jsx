import React, { useState } from 'react'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('infos')

  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey)
  }

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
              Information générale
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'hrsNormal' ? 'show active' : ''}`}
              id="controlled-tab-example-tabpane-hrsNormal"
            >
              Heures normales
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'heuresSup' ? 'show active' : ''}`}
              id="controlled-tab-example-tabpane-heuresSup"
            >
              Heures supplémentaires
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Fiche
