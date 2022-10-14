import { formatDistance, parseISO } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../uses/usesSlice'
import { selectAllNotifications } from './notificationsSlice'

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)
  const renderedNotifications = notifications && notifications.map((notification) => {
    // parseISO(string) 字符串转日期
    const date = parseISO(notification.date)
    const timeAgo = formatDistance(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
