import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/clear.svg';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const inputClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.searchIcon} alt="Search logo" />

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <img onClick={inputClear} src={clearIcon} className={styles.clearIcon} alt="Clear logo" />
      )}
    </div>
  );
};
export default Search;
