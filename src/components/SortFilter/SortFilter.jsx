import css from './style.module.css';

const SortFilter = ({ sortType, onSortChange }) => {
  return (
    <div className={css.block_filters}>
      <span>Filters</span>
      <div className={css.select_filters}>
        <select value={sortType} onChange={onSortChange}>
          <option value="A to Z">A to Z</option>
          <option value="Z to A">Z to A</option>
          <option value="Less than 10$">Less than 10$</option>
          <option value="Greater than 10$">Greater than 10$</option>
          <option value="Popular">Popular</option>
          <option value="Not popular">Not popular</option>
          <option value="Show all">Show all</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
