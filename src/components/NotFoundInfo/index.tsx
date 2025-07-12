import styles from './index.module.scss';
export const NotFoundInfo = () => {
  return (
    <div className={`${styles.infoBlock}`}>
      <h1 className="">Ничего не найдено</h1>
      <p>Данная страница временно недопуступна</p>
    </div>
  );
};
