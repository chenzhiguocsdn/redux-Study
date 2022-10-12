import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../posts/postSlice";

export const UserPage = ({ match }) => {
    const { userId } = match.params

    const user = useSelector(state => selectPostById(state, userId))

    const postsForUser = useSelector(state => {
    })
    return (
        <div></div>
    )
}