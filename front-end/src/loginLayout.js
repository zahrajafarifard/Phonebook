import React from 'react'
import { Routes, Route } from 'react-router'


import LogIn from './components/logIn'
import UserList from './components/user-list'
import AddContact from './components/adContatctByUser'

function AdminLayout () {

  return (
    <div className="">
      <Routes>
        <Route
          exact
          path="/"
          element={<LogIn render={props => ({ ...props })} />}
        />
        <Route
          path="/contacts"
          element={<UserList render={props => ({ ...props })} />}
        />
        <Route
          path="/add-contact"
          element={<AddContact render={props => ({ ...props })} />}
        />

        <Route path="*" element={<LogIn />} />
        {/* <Route path="*" render={() => <Navigate to="/" replace/>} /> */}

      </Routes>
    </div>
  )
}

export default AdminLayout
