import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from 'src/redux/notificationStack/notificationStackReducer'

const NotificationStack = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notification.notifications)

  const removeNotificationsHandler = (id) => {
    dispatch(removeNotification(id))
  }

  return (
    <div className="flex flex-col fixed bottom-0 gap-1 right-0">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          onClose={() => removeNotificationsHandler(notification.id)}
        />
      ))}
    </div>
  )
}

export default NotificationStack
