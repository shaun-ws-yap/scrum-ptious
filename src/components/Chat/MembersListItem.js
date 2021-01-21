import React from 'react';
import classNames from 'classnames';


export default function MembersListItem(props) {
  const { name, role, avatar, online } = props;
  const imgClass = classNames('chat-avatar', 'members-list-avatar', { 'avatar-online': online })
  const itemClass = classNames('members-list-item', { 'member-item-online': online })
  return (
    <div className={itemClass}>
      <img src={avatar} alt= "User Avatar" className={imgClass}></img>
      <div>
        <div>{name}</div>
        <div>{role}</div>
      </div>
    </div>
  )
}