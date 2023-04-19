import BlogForm from './BlogForm'
import Togglable from './Togglable'

const CreateBlog = ({ section, blogFormRef, handleCreate }) => {
  return (
    <div style={section}>
      <h2>Create New</h2>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm addBlog={handleCreate} />
      </Togglable>
    </div>
  )
}

export default CreateBlog
