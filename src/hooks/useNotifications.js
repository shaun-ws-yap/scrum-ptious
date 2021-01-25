import { useState, useEffect } from 'react';

export default function useNotifications(userInfo, setMenu, NotificationManager) {
  const [userNotification, setUserNotification] = useState({
    title: "",
    message: "",
    type: "",
    user: "",
  });

  const [managerNotification, setManagerNotification] = useState({
    title: "",
    message: "",
    type: "",
    user: "",
  });

  useEffect(() => {
    if (userNotification.message !== "" && userNotification.user === userInfo.id) {
      switch(userNotification.type) {
        case 'info':
          NotificationManager.info(userNotification.message, userNotification.title);
          break;
        case 'success':
          NotificationManager.success(userNotification.message, userNotification.title);
          break;
        case 'warning':
          NotificationManager.warning(userNotification.message, userNotification.title, 5000, () => {
            setMenu("Tasks");
          })
          break;
        case 'error':
          NotificationManager.error(userNotification.message, userNotification.title);
          break;
      }
      setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
    }
    if (managerNotification.message !== "" && managerNotification.user === userInfo.id) {
      console.log(managerNotification.type)
      switch(managerNotification.type) {
        case 'info':
          NotificationManager.info(managerNotification.message, managerNotification.title);
          break;
        case 'success':
          NotificationManager.success(managerNotification.message, managerNotification.title);
          break;
        case 'warning':
          NotificationManager.warning(managerNotification.message, managerNotification.title);
          break;
        case 'error':
          NotificationManager.error(managerNotification.message, managerNotification.title);
          break;
      }
      setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
    }
  }, [userNotification, managerNotification])

  return {
    userNotification,
    managerNotification,
    setUserNotification,
    setManagerNotification
  }
}