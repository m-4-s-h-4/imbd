import NextLink from 'next/link';
import styles from '@/styles/Back.module.css';
interface ButtonProps {
  text: string;
}

// return to main page button

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <NextLink href="/">
      <button className={styles.button}>{text}</button>
    </NextLink>
  );
};

export default Button;