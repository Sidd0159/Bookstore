import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/assign-admin">Assign Admin</Link>
        </li>
        <li>
          <Link to="/admin/create-book">Create Book</Link>
        </li>
        <li>
          <Link to="/admin/update-book">Update Book</Link>
        </li>
        <li>
          <Link to="/admin/delete-book">Delete Book</Link>
        </li>
      </ul>

    </div>
  )
}

export default AdminDashboard