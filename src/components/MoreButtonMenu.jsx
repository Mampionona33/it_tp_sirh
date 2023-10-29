import React from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { PropTypes } from 'prop-types'

const MoreButtonMenu = (props) => {
  return (
    <>
      <Menu>
        <MenuHandler>
          <Button variant="text">
            <EllipsisVerticalIcon className="text-customRed-900 w-6 h-6" />
          </Button>
        </MenuHandler>
        <MenuList>
          {props.items &&
            props.items.map((item, key) => (
              <>
                <MenuItem key={key}>{item}</MenuItem>
              </>
            ))}
          <MenuItem>test2</MenuItem>
          <MenuItem>test3</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
MoreButtonMenu.propTypes = {
  items: PropTypes.array,
}

export default MoreButtonMenu
