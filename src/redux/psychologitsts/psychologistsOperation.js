import { onValue, ref } from 'firebase/database';
import { setPsychologists } from './psychologistsSlice';
import { db } from '../../firebase/firebaseConfig';

export const fetchPsychologists = () => dispatch => {
  const psychologistsRef = ref(db, 'path/to/psychologists'); // Вкажіть правильний шлях до даних
  const unsubscribe = onValue(psychologistsRef, snapshot => {
    const data = snapshot.val();
    const psychologistsArray = data ? Object.values(data) : [];
    const psychologistsWithId = psychologistsArray.map(psychologist => ({
      ...psychologist,
      id: psychologist.name,
    }));

    dispatch(setPsychologists(psychologistsWithId));
  });
  return () => {
    unsubscribe();
  };
};
