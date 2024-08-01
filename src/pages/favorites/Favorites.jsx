import React from 'react';
import PsychologistCard from '../../components/Psychologists/PsychologistsCard';
import { selectFavoritePsychologists } from '../../redux/psychologitsts/psychologistsSelector';
import css from './style.module.css';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favoritePsychologists = useSelector(selectFavoritePsychologists);

  return (
    <div className={css.favorites_page}>
      {favoritePsychologists.length > 0 ? (
        <div className={css.psychologists_list}>
          {favoritePsychologists.map(psychologist => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}
        </div>
      ) : (
        <p>No favorite psychologists</p>
      )}
    </div>
  );
};

export default Favorites;
