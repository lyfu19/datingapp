import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import Navbar from '../layout/Navbar';
import Home from '../features/home/Home';
import { User } from '../shared/types';
import { API_BASE_URL } from '../config/api';

function App() {
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_BASE_URL}members`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
