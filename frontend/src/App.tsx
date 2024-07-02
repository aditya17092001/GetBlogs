import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { EditBlog } from './pages/EditBlog'
import { Delete } from './pages/Delete'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<Signin/>}/>
          <Route path= "signup" element={<Signup/>}/>
          <Route path= "signin" element={<Signin/>}/>
          <Route path= "blog/:id" element={<Blog/>}/>
          <Route path= "blogs" element={<Blogs/>}/>
          <Route path= "publish" element={<Publish/>}/>
          <Route path= "edit/:id" element={<EditBlog/>}/>
          <Route path= "delete/:id" element={<Delete/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
