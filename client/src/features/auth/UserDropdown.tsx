import { User } from '../../shared/types';

interface Props {
  user: User;
  onLogout: () => void;
}

const UserDropdown = ({ user, onLogout }: Props) => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center text-white text-xl gap-3 cursor-pointer"
      >
        <img src="/user.png" alt="user avatar" className="w-8 h-8 rounded-full" />
        <span>{user.displayName}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content dropdown-end menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <a>Edit profile</a>
        </li>
        <li>
          <a onClick={onLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
