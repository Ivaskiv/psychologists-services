//App.jsx
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchPsychologists } from '../../redux/psychologitsts/psychologistsOperation.js';

const Home = lazy(() => import('../../pages/home/Home.jsx'));
const Header = lazy(() => import('../../pages/header/Header.jsx'));
const PsychologistsList = lazy(() => import('../Psychologists/PsychologistsList.jsx'));
const Favorites = lazy(() => import('../../pages/favorites/Favorites.jsx'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/psychologists" element={<PsychologistsList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} theme="light" />
    </Suspense>
  );
};

export default App;
