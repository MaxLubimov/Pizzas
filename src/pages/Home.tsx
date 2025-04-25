import React from 'react';

import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  setCategoryId,
  setCurrnetPage,
  setFilters,
  initialState,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import NotFoundBlock from '../components/NotFound';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const location = useLocation();

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sortType, sortOrder, currnetPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrnetPage(page));
  }, []);

  const getPizzas = async () => {
    const category = categoryId !== 0 ? categoryId : '';
    const search = searchValue !== '' ? searchValue : '';
    const sort = sortType.sortProperty;
    dispatch(
      fetchPizzas({
        currnetPage: String(currnetPage),
        category: String(category),
        search,
        sort,
        sortOrder,
      }),
    );
    window.scrollTo(0, 0);
  };

  // Вшивание параметров в ссылку
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sortProperty,
        sortOrder: sortOrder,
        categoryId: categoryId,
        currnetPage: currnetPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, sortOrder, categoryId, currnetPage]);

  // Диспатч параметров из ссылки
  React.useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));
      if (
        initialState.categoryId === Number(params.categoryId) &&
        initialState.currnetPage === Number(params.currnetPage) &&
        initialState.sortType.sortProperty === params.sortType &&
        initialState.sortOrder === params.sortOrder
      ) {
        getPizzas();
      }
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortType);
      if (sortType) {
        params.sortType = sortType;
      }

      dispatch(
        setFilters({
          searchValue: String(searchValue ? params.search : ''),
          categoryId: Number(params.categoryId),
          currnetPage: Number(params.currnetPage),
          sortType: sortType || sortList[0],
          sortOrder: String(params.sortOrder),
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Отправка запроса
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [sortType.sortProperty, sortOrder, categoryId, searchValue, currnetPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortType={sortType} sortOrder={sortOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}
      <Pagination currnetPage={currnetPage} setPage={onChangePage} />
    </div>
  );
};

export default Home;
