'use client';

import { useState,  } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete  }) => {

  const { data:session  } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [ copied, setCopied ] = useState("");




  const handleProfileClick = () => {

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {

    setCopied(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => setCopied(""), 3000);

  }


  return (
    <div className="post_card">
      <div className="flex justify-between gap-5 items-start">
        <div className="flex-1 flex justify-start cusror-pointer items-center gap-3"  onClick={handleProfileClick}>
          <Image 
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>

          </div>

        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.post 
            ? '/assets/icons/tick.svg' 
            : '/assets/icons/copy.svg'}
            title={copied === post.post 
            ? 'Copied !!' 
            : 'Copy on clipboard'}
            alt="Copy on clipboard"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.post}
      </p>

      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={ () => handleTagClick && handleTagClick(post.tag)  }
        >
        #{post.tag}
      </p>

      {
        session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p 
              title="Edit prompt"
              className="font-inter text-sm green_gradient cursor-pointer" 
              onClick={handleEdit}>
              Edit
            </p>
            <p 
              title="Delete prompt"
              className="font-inter text-sm orange_gradient cursor-pointer" 
              onClick={handleDelete}>
              Delete
            </p>
          </div>
        )
      }

    </div>
  )
}

export default PromptCard