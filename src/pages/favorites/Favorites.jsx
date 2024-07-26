import css from './style.module.css';
import { useSelector } from 'react-redux';
import PsychologistCard from '../../components/psychologistCard/psychologistCard.jsx';

const Favorites = () => {
  const favorites = useSelector(state => {
    const { favoriteIds, list } = state.psychologists;
    return list.filter(psychologist => favoriteIds.includes(psychologist._id));
  });

  return (
    <div className={css.favorites_page}>
      {favorites.length > 0 ? (
        <div className={css.psychologists_list}>
          {favorites.map(psychologist => (
            <PsychologistCard key={psychologist.id} />
          ))}
        </div>
      ) : (
        <p>No favorite psychologists</p>
      )}
    </div>
  );
};

export default Favorites;
