import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <nav>
      <section>
        <h1>Redux 循序渐进示例</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to={`/`}>帖子列表</Link>
            <Link to={`/users`}>用户列表</Link>
            <Link to="/notifications">Notification</Link>
          </div>
          <button className='button' onClick={fetchNewNotifications}> Refresh Notifications</button>
        </div>
      </section>
    </nav>
  )
}
