import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem } from '../../features/slices/cartSlice/cartSlice';
import { selectCart } from '../../features/slices/cartSlice/cartSelector';
import { pizzaTypes } from '../../constants/constants';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category?: number;
}

export const PizzaCard = ({ id, imageUrl, name, types = [], sizes = [], price, category }: Props) => {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector(selectCart);
  const [count, setCount] = React.useState(0);
  const [size, setSize] = React.useState(0);
  const [type, setType] = React.useState(0);

  const onClickAdd = () => {
    setCount((prev) => prev + 1);
    const obj = {
      id,
      imageUrl,
      name,
      type: type,
      size: size,
      price,
      count: 1,
      category: category ?? 0,
    };
    dispatch(addItem(obj));
    console.log(items);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item, index) => (
            <li onClick={() => setType(index)} key={index} className={type === index ? 'active' : ''}>
              {pizzaTypes[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, index) => (
            <li key={index} onClick={() => setSize(index)} className={size === index ? 'active' : ''}>
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
};
