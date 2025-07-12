import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSekeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Изображение пиццы (соответствует .pizza-block__image) */}
    <circle cx="140" cy="130" r="120" />
    {/* Название (соответствует .pizza-block__title) */}
    <rect x="0" y="280" rx="5" ry="5" width="280" height="24" />
    {/* Селектор теста (первый ul) */}
    <rect x="0" y="320" rx="5" ry="5" width="280" height="60" />
    {/* Нижняя часть (соответствует .pizza-block__bottom) */}
    <rect x="0" y="390" rx="5" ry="5" width="90" height="30" /> {/* Цена */}
    <rect x="130" y="390" rx="20" ry="20" width="150" height="40" /> {/* Кнопка */}
  </ContentLoader>
);
