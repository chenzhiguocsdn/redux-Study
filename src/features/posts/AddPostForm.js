import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'
import { addNewPost } from './postSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChangeed = (e) => setUserId(e.target.value)

  // const onSavePostClicked = () => {
  //   if(title && content) {
  //       // dispatch(
  //       //     postAdded({
  //       //         id: nanoid(),
  //       //         title,
  //       //         content
  //       //     })
  //       // )
  //       dispatch(postAdded(title, content, userId))
  //       setTitle('')
  //     setContent('')
  //   }
  // }

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch(err) {
        console.error('Failed to save the post:', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>添加新帖子</h2>
      <form>
        <label htmlFor="postTitle">帖子标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChangeed}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          保存帖子
        </button>
      </form>
    </section>
  )
}
