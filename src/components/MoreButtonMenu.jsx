import PropTypes from 'prop-types'
import React from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const MoreButtonMenu = (props) => {
  return (
    <>
      <Menu>
        <MenuHandler>
          <Button
            className="hover:bg-customRed-100 rounded-full p-1 w-10 h-10 flex items-center justify-center"
            variant="text"
          >
            <EllipsisVerticalIcon className="text-customRed-900 w-5 h-5" />
          </Button>
        </MenuHandler>
        <MenuList className="p-0">
          {props.items &&
            props.items.map((item, key) => (
              <MenuItem className="p-0 border-0 hover:bg-customRed-100 " key={key}>
                <Link className="btn " to={item.path}>
                  {item.label}
                </Link>
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  )
}

MoreButtonMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
}

export default MoreButtonMenu
