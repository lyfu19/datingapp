import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="card bg-base-100 w-1/2 mx-auto p-10 mt-10 shadow-xl">
      <h1 className="text-3xl text-red-500">Dating App</h1>
      <ul className="list">
        {members.map((member) => (
          <li key={member.id} className="list-row items-center">
            <img src="/user.png" alt="user avatar" className="size-12 rounded-box" />
            <div>{member.displayName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
