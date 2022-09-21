import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)


  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChangeed = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if(title && content) {
        // dispatch(
        //     postAdded({
        //         id: nanoid(),
        //         title,
        //         content
        //     })
        // )
        dispatch(postAdded(title, content))
        setTitle('')
      setContent('')
    }
  }

  return (
    <section>
        <h2>添加新帖子</h2>
        <form>
            <label htmlFor='postTitle'>帖子标题:</label>
            <input
            type='text'
            id='postTitle'
            name='postTitle'
            value={title}
            onChange={onTitleChanged}
            />
            <label htmlFor='postContent'>内容：</label>
            <textarea
                id='postContent'
                name='postContent'
                value={content}
                onChange={onContentChanged}
            />
            <button type='button' onClick={onSavePostClicked}>保存帖子</button>
        </form>
    </section>
  )
}

