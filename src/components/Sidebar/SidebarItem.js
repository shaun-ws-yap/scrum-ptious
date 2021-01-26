import React from 'react';
import classNames from 'classnames';

export default function SidebarItem(props) {
  const menuClass = classNames("sidebar-list__item", {
    'sidebar-list__item--selected': props.selected
  })

  return (
    <li
      className={menuClass}
      onClick={() => props.setMenu(props.name)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h2>{props.name}</h2>
    </li>
  )
}