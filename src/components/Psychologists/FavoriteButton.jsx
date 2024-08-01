import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice'; // Імпортуйте selectUser
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { addFavoriteId, removeFavoriteId } from '../../redux/psychologitsts/psychologistsSlice';

const FavoriteButton = ({ id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Перевірка статусу улюблених карток при монтуванні компонента
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleToggleFavorite = () => {
    if (!user) {
      toast.info('Цей функціонал доступний лише для авторизованих користувачів.');
      return;
    }

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(id);

    if (isFavorite) {
      // Видалення з обраних
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      dispatch(removeFavoriteId(id)); // Оновлення Redux
      remove(favoriteRef); // Видалення з Firebase
    } else {
      // Додавання до обраних
      const updatedFavorites = [...favorites, id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      dispatch(addFavoriteId(id)); // Оновлення Redux
      set(favoriteRef, true); // Додавання у Firebase
    }
    setIsFavorite(!isFavorite);
  };

  return <button onClick={handleToggleFavorite}>{isFavorite ? '❤️' : '🤍'}</button>;
};

export default FavoriteButton;
