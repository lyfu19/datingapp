import { useState } from 'react';
import LoginForm from '../features/auth/LoginForm';
import { User } from '../shared/types';
import UserDropdown from '../features/auth/UserDropdown';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="p-3 w-full fixed top-0 z-50 bg-gradient-to-r from-primary to-black">
      <div className="flex align-middle items-center px-10 mx-auto gap-6">
        <a className="flex items-center gap-3 max-h-16 text-white border-r-white border-r-2 pr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>

          <h3 className="text-2xl font-semibold text-white uppercase">Dating app</h3>
        </a>
        <nav className="flex gap-3 my-2 uppercase text-lg text-white">
          <a>Matches</a>
          <a>Lists</a>
          <a>Messages</a>
        </nav>
        <div className="flex align-middle ml-auto gap-3">
          {currentUser ? <UserDropdown user={currentUser} onLogout={logout} /> : <LoginForm />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
