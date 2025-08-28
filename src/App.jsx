import React from 'react'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router'
import Layout from '../src/Layout/Layout'
import Home from './Pages/Home'
import PNF from './Pages/PNF'
const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/>

        </Route>
        <Route path='*' element={<PNF/>} />
      </>
    ))
  return (
<RouterProvider router={routes}/>
  )
}

export default App