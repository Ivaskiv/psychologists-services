import css from './style.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists } from '../../redux/psychologitsts/psychologistsOperation';
import {
  selectPsychologists,
  selectCurrentPage,
  selectItemsPerPage,
} from '../../redux/psychologitsts/psychologistsSlice';
import PsychologistsCard from '../../components/PsychologistsCard/PsychologistsCard';

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const page = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectItemsPerPage);

  useEffect(() => {
    dispatch(fetchPsychologists({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  const handleLoadMore = () => {
    dispatch(fetchPsychologists({ page: page + 1, pageSize }));
  };

  return (
    <div className={css.psychologists_list}>
      {psychologists.length > 0 &&
        psychologists.map(psychologist => (
          <PsychologistsCard key={psychologist.id} psychologist={psychologist} />
        ))}
      <button type="button" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default PsychologistsList;

// import css from './style.module.css';
// import { useEffect } from 'react';
// import PsychologistsCard from '../../components/PsychologistsCard/PsychologistsCard.jsx';
// // import { onValue, ref } from 'firebase/database';
// // import { db } from '../../../firebaseConfig.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPsychologists } from '../../redux/psychologitsts/psychologistsOperation.js';
// import { selectCurrentPage } from '../../redux/psychologitsts/psychologistsSlice.js';

// const PsychologistsList = () => {
//   // const [psychologists, setPsychologists] = useState([]);
//   // const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const psychologistRef = ref(db, 'psychologists');

//   //   const unsubscribe = onValue(
//   //     psychologistRef,
//   //     snapshot => {
//   //       try {
//   //         const data = snapshot.val();
//   //         if (data) {
//   //           const psychologistsArray = Object.keys(data).map(key => ({
//   //             id: key,
//   //             ...data[key],
//   //           }));
//   //           setPsychologists(psychologistsArray);
//   //         } else {
//   //           setPsychologists([]);
//   //         }
//   //       } catch (error) {
//   //         console.error('Error fetching data:', error);
//   //         setError(error.message);
//   //       }
//   //     },
//   //     error => {
//   //       console.error('Error fetching data:', error);
//   //       setError(error.message);
//   //     }
//   //   );
//   //   return () => unsubscribe();
//   // }, []);
//   const dispatch = useDispatch();
//   const { psychologists, isLoading, page, pageSize, totalCount } = useSelector(
//     state => state.psychologists
//   );

//   useEffect(() => {
//     dispatch(fetchPsychologists({ page, pageSize }));
//   }, [dispatch, page, pageSize]);

//   const handleLoadMore = () => {
//     dispatch(selectCurrentPage(page + 1));
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={css.psychologists_list}>
//       {psychologists.length > 0 &&
//         psychologists.map(psychologist => (
//           <PsychologistsCard key={psychologist.id} psychologist={psychologist} />
//         ))}
//       {psychologists.length < totalCount && (
//         <button type="submit" onClick={handleLoadMore}>
//           Load more
//         </button>
//       )}
//     </div>
//   );
// };

// export default PsychologistsList;
