import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'admin' | 'user';
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">User Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id} className="text-center">
            <td className="py-2 px-4 border">{u.name}</td>
            <td className="py-2 px-4 border">{u.email}</td>
            <td className="py-2 px-4 border capitalize">{u.userType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserList;
