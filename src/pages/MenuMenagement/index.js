import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateItems from './CreateItem'

export default function MenuMenagement() {
  return (
    <Routes>
        <Route path="/createitem" element={<CreateItems />} />
      
    </Routes>
  )
}
