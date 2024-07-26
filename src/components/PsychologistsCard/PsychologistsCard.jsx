import css from './style.module.css';

const PsychologistsCard = ({ psychologist }) => {
  return (
    <div key={psychologist.id} className={css.psychologist_card}>
      <img src={psychologist.avatar_url} alt={psychologist.name} className={css.avatar} />
      <h3>{psychologist.name}</h3>
      <p>{psychologist.specialization}</p>
      <p>Experience: {psychologist.experience}</p>
      <p>Rating: {psychologist.rating}</p>
      <p>Price per hour: ${psychologist.price_per_hour}</p>
    </div>
  );
};

export default PsychologistsCard;
