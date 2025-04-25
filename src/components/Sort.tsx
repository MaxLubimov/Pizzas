import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort, setOrder, SortItem } from '../redux/slices/filterSlice';

type SortPopupProps = {
  sortType: SortItem;
  sortOrder: string;
};
export const sortList: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort: React.FC<SortPopupProps> = React.memo(({ sortType, sortOrder }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const onClick = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  const onChangeOrder = (order: string) => {
    dispatch(setOrder(order === 'desc' ? 'asc' : 'desc'));
  };

  // useEffect который отвечает за закрытие окна сортировки при клике в другой области
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => onChangeOrder(sortOrder)}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <g className={sortOrder} id="sortSvg" data-name="sortSvg">
            <path d="m31 7a2 2 0 0 1 -2 2h-26a2 2 0 0 1 0-4h26a2 2 0 0 1 2 2zm-6 7h-18a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4zm-3 9h-12a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4z"></path>
          </g>
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortType.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, sortIndex) => (
              <li
                key={sortIndex}
                onClick={() => onClick(obj)}
                className={sortType.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default Sort;
