import css from './style.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { startOfDay, format } from 'date-fns';

const formSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  date: Joi.date().min(startOfDay(new Date())).required().messages({
    'date.base': 'Booking date must be a valid date',
    'date.min': 'Booking date cannot be in the past',
    'any.required': 'Booking date is required',
  }),
  comment: Joi.string().allow('').min(3).max(30).optional(),
});

const ModalBookCamperForm = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(formSchema),
  });

  // зчитати дані з локального сховища
  // useEffect(() => {
  //   const storedData = localStorage.getItem('userData');
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     if (parsedData.date) {
  //       const formattedDate = format(new Date(parsedData.date), 'yyyy-MM-dd');
  //       parsedData.date = formattedDate;
  //     }
  //     reset(parsedData);
  //   }
  // }, []);

  const onSubmit = data => {
    const formattedData = {
      ...data,
      date: format(new Date(data.date), 'dd-MM-yyyy'),
    };

    console.log('дані форми:', formattedData);
    // localStorage.setItem('userData', JSON.stringify(formattedData));
    reset();
    onFormSubmit(formattedData);
  };

  return (
    <div className={css.container_form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_title}>
          <h3>Book your campervan now</h3>
          <p>Stay connected! We are always ready to help you.</p>
        </div>

        <input
          className={css.field}
          {...register('name')}
          type="text"
          name="name"
          placeholder="Name"
        />
        {errors.name && <div>{errors.name.message}</div>}

        <input
          className={css.field}
          {...register('email')}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email && <div>{errors.email.message}</div>}

        <input
          className={css.field}
          {...register('date')}
          type="date"
          name="date"
          placeholder="Booking date"
        />
        {errors.date && <div>{errors.date.message}</div>}

        <textarea
          className={css.textarea}
          {...register('comment')}
          name="comment"
          placeholder="Comment"
        ></textarea>
        {errors.comment && <div>{errors.comment.message}</div>}

        <div className={css.btn_submit_container}>
          <button className={css.btn_submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalBookCamperForm;

// Щоб контролювати форму за допомогою Redux,
// потрібно створити
// 1. дії(actions),
// 2. редюсер(reducer) та
// 3. налаштувати стан(state) для управління формою.
// Далі необхідно підключити компонент до Redux
// за допомогою useDispatch та useSelector з бібліотеки react-redux
