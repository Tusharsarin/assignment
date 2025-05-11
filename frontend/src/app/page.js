'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link href="/add-user">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer">
          Add New User
        </button>
      </Link>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <Link href={`/user/${user.id}`}>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}