import { useAppDispatch } from '../../app/hooks';
import { removeItem, addItem, destroyItem } from '../../features/slices/cartSlice/cartSlice';
import { pizzaTypes, sizeTypes } from '../../constants/constants';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  type: number;
  size: number;
  price: number;
  category: number;
  rating?: number;
  count: number;
}

export const CartItem = ({ ...item }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={`${item.imageUrl}`} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{item.name}</h3>
        <p>
          {pizzaTypes[item.type]} тесто, {sizeTypes[item.size]} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={() => dispatch(removeItem(item))}
          className="button button--outline button--circle cart__item-count-minus"
        >
          -
        </div>
        <b>{item.count}</b>
        <div
          onClick={() => dispatch(addItem(item))}
          className="button button--outline button--circle cart__item-count-plus"
        >
          +
        </div>
      </div>
      <div className="cart__item-price">
        <b>{item.price * item.count} ₽</b>
      </div>
      <div onClick={() => dispatch(destroyItem(item))} className="cart__item-remove">
        <div className="button button--outline button--circle">X</div>
      </div>
    </div>
  );
};
