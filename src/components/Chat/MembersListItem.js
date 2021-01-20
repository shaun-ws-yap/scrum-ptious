import React from 'react';
import classNames from 'classnames';


export default function MembersListItem(props) {
  const { name, role, avatar } = props;
  const imgClass = classNames('chat-avatar', 'members-list-avatar', { online: false })
  return (
    <div className="members-list-item">
      <img src={avatar} alt= "User Avatar" className={imgClass}></img>
      <div>
        <div>{name}</div>
        <div>{role}</div>
      </div>
    </div>
  )
}