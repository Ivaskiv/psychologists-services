import css from './style.module.css';
import { useEffect, useState } from 'react';
import PsychologistCard from './PsychologistsCard';
import { fetchPsychologists } from '../../redux/psychologitsts/psychologistsOperation';
import { setPage } from '../../redux/psychologitsts/psychologistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPsychologists,
  selectCurrentPage,
  selectTotalPages,
} from '../../redux/psychologitsts/psychologistsSelector';
import SortFilter from '../SortFilter/SortFilter';

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const [sortType, setSortType] = useState('A to Z');
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    dispatch(fetchPsychologists(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    // Збільшити видимі картки тільки після того, як нові психологи завантажені
    setVisibleCards(psychologists.length);
  }, [psychologists]);

  const handleSortChange = e => {
    setSortType(e.target.value);
  };

  const sortedPsychologists = [...psychologists].sort((a, b) => {
    switch (sortType) {
      case 'A to Z':
        return a.name.localeCompare(b.name);
      case 'Z to A':
        return b.name.localeCompare(a.name);
      case 'Less than 10$':
        return a.price - b.price;
      case 'Greater than 10$':
        return b.price - a.price;
      case 'Popular':
        return b.rating - a.rating;
      case 'Not popular':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <div className={css.psychologist_container}>
      <div className={css.psychologist_list}>
        <SortFilter sortType={sortType} onSortChange={handleSortChange} />
        <div className={css.psychologist_container}>
          {sortedPsychologists.slice(0, visibleCards).map(psychologist => (
            <PsychologistCard
              key={psychologist.id}
              id={psychologist.id}
              psychologist={psychologist}
            />
          ))}
        </div>
        {currentPage < totalPages && (
          <button type="button" className={css.btn_load_more} onClick={handleLoadMore}>
            Завантажити більше
          </button>
        )}
      </div>
    </div>
  );
};

export default PsychologistsList;
