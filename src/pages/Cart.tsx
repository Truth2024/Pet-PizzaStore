import styles from './Cart.module.scss';
import { ReactComponent as ArrowLeft } from '../assets/img/grey-arrow-left.svg';
import { ReactComponent as Trash } from '../assets/img/trash.svg';
import { ReactComponent as CartTitle } from '../assets/img/cart.svg';
import { CartItem } from '../components/CartItem';
import { selectCart } from '../features/slices/cartSlice/cartSelector';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { CartEmpty } from '../components/CartEmpty/CartEmpty';
import { resetCart } from '../features/slices/cartSlice/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, lengthItem, totalPrice } = useAppSelector(selectCart);
  return items && items.length > 0 ? (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <CartTitle /> Корзина
        </h2>
        <div onClick={() => dispatch(resetCart())} className="cart__clear">
          <Trash />
          <span>Очистить корзину</span>
        </div>
      </div>

      <div>
        {items.map((item) => (
          <CartItem key={`${item.id}-${item.type}-${item.size}`} {...item} />
        ))}
      </div>

      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{lengthItem} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </span>
        </div>

        <div className="cart__bottom-buttons">
          <button
            onClick={() => navigate(-1)}
            className={`${styles.btnBack} button button--outline button--add go-back-btn`}
          >
            <ArrowLeft />
            <span>Вернуться назад</span>
          </button>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CartEmpty />
  );
};
export default Cart;
