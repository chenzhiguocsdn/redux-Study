import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostsByUser } from '../posts/postSlice'
import { selectUserById } from './usersSlice'
 
export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector(state => selectPostsByUser(state, userId))

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <div>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </div>
  )
}
