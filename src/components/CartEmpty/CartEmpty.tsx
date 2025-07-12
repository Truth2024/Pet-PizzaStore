import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/img/grey-arrow-left.svg';
import img from '../../assets/img/empty-cart.png';
import styles from './CartEmpty.module.scss';
export const CartEmpty = () => {
  const navigate = useNavigate();
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={img} alt="Empty cart" />
      <button onClick={() => navigate(-1)} className="button button--black">
        <ArrowLeft className={styles.svg} />
        <span>Вернуться назад</span>
      </button>
    </div>
  );
};
