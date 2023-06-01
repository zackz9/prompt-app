'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const MyProfile = () => {

    const router = useRouter();

    const { data:session } = useSession();

    const [ posts, setPosts ] = useState([]);
    
    useEffect(() => {

        //Map to get posts
        const fetchPosts = async () => {

        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);

        }

        if(session?.user.id) {
            fetchPosts();
        }

    }, [])


    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt ?')

        if(hasConfirmed) {
            try {
                await fetch(`/api/post/${post._id.toString()}`, {
                    method: 'DELETE',

                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);

            } catch (error) {
                
            }
        }
    }


    return (
        <Profile 
            name={session?.user.username}
            desc="Welcome to your personalized profile page, here you'll find all prompts you've created."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

        />
    )
}

export default MyProfile