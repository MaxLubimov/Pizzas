import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItemById } from '../redux/slices/cartSlice';
import { PizzaItem } from '../redux/slices/pizzaSlice';
import { typeNames } from '../components/PizzaBlock';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<PizzaItem>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<PizzaItem>(
          `https://6782b104c51d092c3dd078d9.mockapi.io/items/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Не удалось получить пиццу!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(String(id)));

  const [activeType, setAactiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  if (!pizza) {
    return 'Загрузка...';
  }

  const onClickAdd = () => {
    const item: CartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: activeSize,
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="full-pizza">
      <div className="full-pizza-wrapper">
        <img className="full-pizza__image" src={pizza.imageUrl} />
        <div className="full-pizza__info">
          <h2>{pizza.title}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, dolore. Nulla culpa quia
            quisquam ipsum quasi, officia dicta ipsam modi vitae quis officiis facilis aliquid
            reprehenderit possimus delectus cupiditate nisi!
          </p>
          <div className="full-pizza__active">
            <div className="full-pizza__selector">
              <ul>
                {pizza.types.map((typeIndex) => (
                  <li
                    key={typeIndex}
                    onClick={() => setAactiveType(typeIndex)}
                    className={activeType === typeIndex ? 'active' : ''}>
                    {typeNames[typeIndex]}
                  </li>
                ))}
              </ul>
              <ul>
                {pizza.sizes.map((size, sizeIndex) => (
                  <li
                    key={size}
                    onClick={() => setActiveSize(sizeIndex)}
                    className={activeSize === sizeIndex ? 'active' : ''}>
                    {size} см.
                  </li>
                ))}
              </ul>
            </div>
            <div className="full-pizza__bottom">
              <div className="full-pizza__price">от {pizza.price} ₽</div>
              <button onClick={onClickAdd} className="button button--outline button--add">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cart__bottom-buttons">
        <Link to="/Pizzas/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
