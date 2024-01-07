import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import DetailHeures from './detail-heures/DetailHeures'
import BulletinDePaie from './BulletinDePaie/BulletinDePaie'

interface ITabListProps {
  key: string
  label: string
}

const ValidPaieOngletContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('detail-heures')
  const location = useLocation()
  const navigate = useNavigate()
  const { id, activeTabParam } = useParams()
  const tabList: ITabListProps[] = [
    { key: 'detail-heures', label: 'Détails heures' },
    { key: 'valid-paie', label: 'Valider paie' },
    { key: 'confirm-valid-paie', label: 'Confirm validation paie' },
    { key: 'bullettin-paie', label: 'Bulletin de paie' },
  ]

  useEffect(() => {
    const pathParts = location.pathname.split('/')
    const lastPathPart = pathParts[pathParts.length - 1]
    if (
      ['detail-heures', 'valid-paie', 'confirm-valid-paie', 'bullettin-paie'].includes(lastPathPart)
    ) {
      setActiveTab(lastPathPart)
    } else if (activeTabParam) {
      setActiveTab(activeTabParam)
    }
  }, [location.pathname, activeTabParam])

  const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>, eventKey: string) => {
    event.preventDefault()
    setActiveTab(eventKey)
    navigate(`/gestion-de-paie/liste-employee/historique/${id}/valider/2023-12-23/${eventKey}`)
  }
  const renderTab = (tab: ITabListProps) => (
    <li key={tab.key} className="" role="presentation">
      <button
        className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
          activeTab === tab.key ? 'border-customRed-900' : ''
        }`}
        id={`${tab.key}-tab`}
        data-tabs-target={`${tab.key}`}
        type="button"
        role="tab"
        aria-controls={tab.key}
        aria-selected={activeTab === tab.key}
        onClick={(event) => handleTabClick(event, tab.key)}
      >
        {tab.label}
      </button>
    </li>
  )

  const renderTabContent = (tabKey: string): JSX.Element | null => {
    switch (tabKey) {
      case 'detail-heures':
        return <DetailHeures />
      case 'valid-paie':
      case 'bullettin-paie':
        return <BulletinDePaie />
      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-2 shadow">
      <div className="mb-2 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          role="tablist"
        >
          {tabList.map(renderTab)}
        </ul>
      </div>
      {/* Tab contents */}
      <div id="myTabContent">
        {tabList.map((tab) => (
          <div
            key={tab.key}
            className={`p-4 bg-white ${activeTab === tab.key ? 'block' : 'hidden'}`}
            id={tab.key}
            role="tabpanel"
            aria-labelledby={`${tab.key}-tab`}
          >
            {renderTabContent(tab.key)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValidPaieOngletContainer
