import svg from '../../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//components
import { Search } from '../Search';
import { Cart } from '../Cart/Cart';

export const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src={svg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        <Cart />
      </div>
    </div>
  );
};
