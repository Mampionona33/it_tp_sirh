import _nav from '@src/_nav'
import React from 'react'

const Parametre = () => {
  const parametreItems = _nav.filter((item) => item.name === 'Paramètres')

  return (
    <div>
      <ul>
        {parametreItems.map((item) => (
          <li key={item.to}>
            <a href={item.to}>{item.name}</a>
            {/* Ajoutez ici la logique pour afficher les éléments imbriqués */}
            {item.items && (
              <ul>
                {item.items.map((subItem) => (
                  <li key={subItem.to}>
                    <a href={subItem.to}>{subItem.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Parametre
