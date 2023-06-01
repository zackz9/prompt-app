import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { connect } from "mongoose";


// GET to read
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        console.log(params);

        const post = await Post.findById(params.id).populate('creator');

        console.log(post);

        if(!post) return new Response('Post not found!', {  status:404 });

        return new Response(JSON.stringify(post),  {
            status:200,
        })

    } catch (error) {
        return new Response("Internal Server Error to fetch post",  {
            status:500,
        })
    }
}
 

// PATCH to edit 

export const PATCH = async(request, { params }) => {

    const { post, tag } = await request.json();

    try {
        
        await connectToDB();

        // Get the existing post by id 

        const existingPost = await Post.findById(params.id);
        console.log(existingPost);

        if(!existingPost) return Response('Post not found!', {  status:404 });

        // Update post with new data submitted
        existingPost.post = post;
        existingPost.tag = tag;

        await existingPost.save();

        return new Response("Successfully updated the Posts",  {
            status:200,
        })

    } catch (error) {
        return new Response("Failed to update post",  {
            status:500,
        })
    }
}


// DELETE to delete 

export const DELETE = async(request, { params }) => {


    try {

        await connectToDB();

        // Call the func to get post by id and remove it 

        await Post.findByIdAndRemove(params.id);

        return new Response("The post has been deleted successfully",  {
            status:500,
        })
        
    } catch (error) {
        return new Response("Failed to delete post",  {
            status:500,
        })
    }
}