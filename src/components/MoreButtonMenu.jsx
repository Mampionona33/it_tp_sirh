import PropTypes from 'prop-types'
import React from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

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
        <MenuList className="p-0 rounded-none bg-white">
          {props.items &&
            props.items.map((item, key) => (
              <MenuItem className="p-0 rounded-none hover:bg-customRed-100" key={key}>
                {item}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  )
}

MoreButtonMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
}

export default MoreButtonMenu
