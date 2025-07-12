import styles from './Footer.module.scss';
import { FaGithub } from 'react-icons/fa'; // убедись, что установлен react-icons

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>
          🍕<span>React Pizza</span> — самая вкусная пицца во вселенной © {new Date().getFullYear()}
        </p>
        <p>Сделано с ❤️ на React + Redux Toolkit + TS</p>
        <a href="https://github.com/Truth2024" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          <FaGithub className={styles.githubIcon} />
          GitHub
        </a>
      </div>
    </footer>
  );
};
