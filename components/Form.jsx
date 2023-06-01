import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='yellow_gradient'>
          {type} Post
        </span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the community, and let your imaginaton run wild with any AI-powered platform
      </p>

      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '  
      >
        <label>
          <span className='font-satoshi font-semibold text-base tex-gray-700'>Your AI prompt</span>
        </label>

        <textarea 
          value={post.post}
          onChange={ (e) => setPost({ ...post, post: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />

        
        <label>
          <span className='font-satoshi font-semibold text-base tex-gray-700'>
            Tag{` `}
            <span className='font-normal'>
              (Example: #Web development, design, tech, sport, digital)
            </span>
          
          </span>
        </label>

        <input 
          value={post.tag}
          onChange={ (e) => setPost({ ...post, tag: e.target.value })}
          placeholder='#tag...'
          required
          className='form_input'
        />

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link 
              href="/" 
              className='text-gray-500 text-sm'>
              Cancel
          </Link>
          <button 
              type='submit' 
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-primary-blue rounded-full text-white'>
            { submitting ? `${type}...` : type}
          </button>
        </div>

        
      </form>
    </section>
  )
}

export default Form