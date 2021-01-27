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
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.info(userNotification.message, userNotification.title, 5000, () => {
            setMenu("Tasks");
          });
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'success':
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.success(userNotification.message, userNotification.title);
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'warning':
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.warning(userNotification.message, userNotification.title, 5000, () => {
            setMenu("Tasks");
          })
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'error':
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.error(userNotification.message, userNotification.title);
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
      }
      setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
      setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
    }
    if (managerNotification.message !== "" && managerNotification.user === userInfo.id) {
      console.log(managerNotification.type)
      switch(managerNotification.type) {
        case 'info':
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.info(managerNotification.message, managerNotification.title);
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'success':
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.success(managerNotification.message, managerNotification.title);
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'warning':
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.warning(managerNotification.message, managerNotification.title);
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
        case 'error':
          setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          NotificationManager.error(managerNotification.message, managerNotification.title);
          setManagerNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
          break;
      }
      setUserNotification(prev => ({...prev, title: "", message: "", type: "", user: ""}));
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