import { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import css from './style.module.css';

import sprite from '../../../assets/sprite.svg';
import ModalBookCamperForm from '../MakeAnAppointment/MakeAnAppointment.jsx';
import IconStarRating from '../../../Icons/IconStarRating.jsx';
import classNames from 'classnames';
import ButtonsEducation from '../../ButtonsEducation/ButtonsEducation.jsx';

// REDUX
// const tabSlice = createSlice({
//   name: 'tabs',
//   initialState: { selectedTab: null },
//   reducers: {
//     setSelectedTab: (state, action) => {
//       state.selectedTab = action.payload;
//     },
//   },
// });

const CamperModal = ({ show, onClose, advert, _id }) => {
  const [formData, setFormData] = useState(null);

  if (!advert) {
    return <div>Advert not found</div>;
  }

  const { name, description, rating, reviews, gallery, price, location, details } = advert;

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (show) {
      document.body.style.overflow = 'hidden';
      // { passive: true } - вказує браузеру, що обробник подій не викличе event.preventDefault(), тобто не буде перешкоджати дефолтній поведінці події - прокрутці
      document.addEventListener('keydown', handleEscape, { passive: true });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape, { passive: true });
      document.body.style.overflow = '';
    };
  }, [show, onClose]);

  if (!show) return null;
  // REACT
  const [selectedTab, setSelectedTab] = useState(null);
  // REDUX
  // const selectedTab = useSelector(state => state.tabs.selectedTab);
  // const dispatch = useDispatch();

  const handleFormSubmit = data => {
    setFormData(data);
  };

  return (
    <div className={css.modal_overlay} onClick={onClose}>
      <div key={_id} className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.modal_content}>
          <button className={css.modal_close_btn} onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
          {/* title */}
          <div className={css.advert_title}>
            <h3>{name}</h3>
            <div className={css.advert_reviews_location}>
              <div className={css.advert_reviews}>
                <svg className={css.icon_star}>
                  <use href={`${sprite}#icon-star`}></use>
                </svg>
                {rating} ({reviews.length} Reviews)
              </div>
              <div className={css.advert_location}>
                <svg className={css.icon_location}>
                  <use href={`${sprite}#icon-location`}></use>
                </svg>
                {location}
              </div>
            </div>
            <button className={css.price}>€ {price.toFixed(2)}</button>
          </div>
          {/* gallery */}
          <div className={css.modal_scroll}>
            <div className={css.modal_img}>
              {gallery &&
                gallery.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={name} className={css.advert_image} />
                  </div>
                ))}
            </div>
            {/* description */}
            <div className={css.advert_description}>
              <p>{description}</p>
            </div>
          </div>
        </div>
        {/* tabs */}
        <div className={css.container_features_reviews_form}>
          <div>
            <div className={css.container_features_reviews}>
              <button
                className={classNames(css.features, { [css.active]: selectedTab === 'features' })}
                onClick={() => {
                  setSelectedTab('features');
                  // REDUX
                  // dispatch(tabSlice.actions.setSelectedTab('features'));
                }}
              >
                Features
              </button>
              <button
                className={classNames(css.reviews, { [css.active]: selectedTab === 'reviews' })}
                onClick={() => {
                  setSelectedTab('reviews');
                }}
              >
                Reviews
              </button>
            </div>
            <hr className={css.bottom_line}></hr>
            <div className={css.container_left_right}>
              <div className={css.tabs_left}>
                {selectedTab === 'features' && (
                  <>
                    <div className={css.adverts_btn}>
                      {Object.entries(details)
                        .slice(0, 6)
                        .map(([key, value]) => (
                          <ButtonsEducation key={key} id={key} count={value} />
                        ))}
                    </div>
                    <div className={css.vehicle_details}>
                      <h3>Vehicle details</h3>
                      <hr className={css.vehicle_details_line} />
                    </div>
                  </>
                )}
                {selectedTab === 'reviews' && (
                  <div>
                    {reviews.map((review, index) => (
                      <div key={index} className={css.container_reviewer}>
                        <div className={css.conttainer_avatarCircle_name_stars}>
                          <div className={css.avatarCircle}>
                            {review.reviewer_name
                              ? review.reviewer_name.charAt(0).toUpperCase()
                              : ''}
                          </div>
                          <div className={css.container_avatar_stars}>
                            <div className={css.container_name_stars}>
                              <strong>{review.reviewer_name}</strong>
                              <IconStarRating
                                width={24}
                                height={24}
                                rating={review.reviewer_rating}
                                fillColor="#FFC531"
                              />
                            </div>
                          </div>
                        </div>
                        <div>{review.comment}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={css.tabs_form_right}>
                {(selectedTab === 'features' || selectedTab === 'reviews') && (
                  <>
                    <ModalBookCamperForm onFormSubmit={handleFormSubmit} />
                    {formData && <div>{JSON.stringify(ModalBookCamperForm)}</div>}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperModal;
