import React from 'react';
import classNames from 'classnames';

const menuItems = [
  {
    name: 'Dashboard'
  },
  {
    name: 'Tasks'
  },
  {
    name: 'Chat'
  }
];


export default function SidebarItem(props) {
  const menuClass = classNames("sidebar-list__item", {
    'sidebar-list__item--selected': props.selected
  })

  return (
    <Menu>
      <MenuItem className={menuClass} onClick={() => props.setMenu(props.menu_name)}>
        {props.menu_name}
      </MenuItem>
    </Menu>
  )
}