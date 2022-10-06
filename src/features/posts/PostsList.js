import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postSlice'

export const PostsList = () => {
    // const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
      if(postStatus === 'idle') {
        dispatch(fetchPosts())
      }
    }, [postStatus, dispatch])

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const renderedPosts = orderedPosts && orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user}></PostAuthor>
        <TimeAgo timestamp={post.date}></TimeAgo>
        <ReactionButtons post={post}></ReactionButtons>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className='button muted-button'>
          View Post
        </Link>
      </article>
    ))
  return (
    <section className='posts-list'>
        <h2>Posts</h2>
        {renderedPosts}
    </section>
  )
}
