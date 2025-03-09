import { FC } from 'react';
import { User } from '../types';
import '../styles/components/UserList.css';

interface UserListProps {
  users: User[];
  selectedUserId: number | null;
  onSelectUser: (user: User) => void;
}

const UserList: FC<UserListProps> = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={user.id === selectedUserId ? 'selected' : ''}
            onClick={() => onSelectUser(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
