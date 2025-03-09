import { FC, useEffect, useState } from 'react';
import { User, UserDetails } from '../types';
import '../styles/components/UserDetails.css';

interface UserDetailsProps {
  selectedUser: User | null;
}

const UserDetailsComponent: FC<UserDetailsProps> = ({ selectedUser }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedUser) {
      setUserDetails(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(
      `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${selectedUser.id}.json`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить информацию о пользователе');
        }

        return response.json();
      })
      .then((data) => {
        setUserDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [selectedUser?.id]);

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="user-details">
      <h2>Детальная информация</h2>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && userDetails && (
        <div className="details-container">
          <div className="avatar-container">
            <img src={userDetails.avatar} alt={userDetails.name} />
          </div>
          <div className="info-container">
            <h3>{userDetails.name}</h3>
            <div className="detail-item">
              <span className="label">Город:</span>
              <span>{userDetails.details.city}</span>
            </div>
            <div className="detail-item">
              <span className="label">Компания:</span>
              <span>{userDetails.details.company}</span>
            </div>
            <div className="detail-item">
              <span className="label">Должность:</span>
              <span>{userDetails.details.position}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
