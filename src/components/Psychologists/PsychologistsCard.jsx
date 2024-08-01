import { useEffect, useState } from 'react';
import css from './style.module.css';
import StarRating from '../Icons/IconStarRating/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import ModalMakeAnAppointment from '../Modals/ModalMakeAnAppointment/ModalMakeAnAppointment';
import { selectAuthStatus, selectUser } from '../../redux/auth/authSlice';
import ModalAuth from '../Modals/ModalAuth/ModalAuth';
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteButton from './FavoriteButton'; // Імплементація FavouriteButton
import { addFavoriteId, removeFavoriteId } from '../../redux/psychologitsts/psychologistsSlice';

const PsychologistCard = ({ psychologist }) => {
  const {
    id,
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
    isOnline,
  } = psychologist;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isAuthenticated = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
      const unsubscribe = onValue(favoriteRef, snapshot => {
        setIsFavorite(snapshot.exists());
      });

      return () => unsubscribe();
    }
  }, [user, id]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated || !user) {
      toast.info('Цей функціонал доступний лише для авторизованих користувачів.');
      setIsAuthModalOpen(true);
      return;
    }

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isCurrentlyFavorite = favorites.includes(id);

    if (isCurrentlyFavorite) {
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
    setIsFavorite(!isCurrentlyFavorite);
  };

  const handleIsToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleFormSubmit = data => {
    handleCloseModal();
  };

  return (
    <div className={css.psychologist_card}>
      <div className={css.avatar}>
        <img src={avatar_url} alt={`${name}'s avatar`} className={css.avatar_img} />
        <div
          className={`${css.status_indicator} ${isOnline ? css.Online : css.Offline}`}
          title={isOnline ? 'Online' : 'Offline'}
        ></div>
      </div>
      <div className={css.block_rating_price_favorite}>
        <div className={css.star_rating}>
          <StarRating rating={rating} />
          <span className={css.rating_text}>Rating: {rating}</span>
        </div>
        <span>|</span>
        <div className={css.price_block}>
          Price / 1 hour: <span className={css.price_span}>{price_per_hour}$</span>
        </div>
        <FavoriteButton id={id} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
      </div>
      <div className={css.psychologist_details}>
        <p className={css.pre_title}>Psychologist</p>
        <h2 className={css.name_titile}>{name}</h2>
        <div className={css.btn_education_container}>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Experience:&nbsp;</span> {experience}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>License:&nbsp;</span> {license}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Specialization:&nbsp;</span> {specialization}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Initial consultation:&nbsp;</span>
            {initial_consultation}
          </button>
        </div>
        <div className={css.psychologist_about}>{about}</div>
        <button className={css.btn_read_more} type="button" onClick={handleIsToggleExpand}>
          Read more
        </button>
        {isExpanded && (
          <div>
            {reviews.map((review, index) => (
              <div key={index} className={css.container_reviewer}>
                <div className={css.conttainer_avatarCircle_name_stars}>
                  <div className={css.avatarCircle}>
                    {review.reviewer ? review.reviewer.charAt(0).toUpperCase() : ''}
                  </div>
                  <div className={css.container_avatar_stars}>
                    <div className={css.container_name_stars}>
                      <strong>{review.reviewer}</strong>
                      <StarRating
                        width={24}
                        height={24}
                        rating={review.rating}
                        fillColor="#FFC531"
                      />
                      {review.rating}
                    </div>
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))}
            <button className={css.btn_appointment} type="button" onClick={handleOpenModal}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
      <ModalMakeAnAppointment
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        psychologist={psychologist}
      />
      <ModalAuth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default PsychologistCard;
