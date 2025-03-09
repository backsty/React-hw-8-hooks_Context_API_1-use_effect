import { useEffect, useState } from 'react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { User } from './types';
import './styles/App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить список пользователей');
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="app-container">
      <h1>Информация о пользователях</h1>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка списка пользователей...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && (
        <div className="content-container">
          <UserList
            users={users}
            selectedUserId={selectedUser?.id || null}
            onSelectUser={handleSelectUser}
          />
          <UserDetails selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default App;
