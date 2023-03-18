import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import styles from '@/styles/RemoveButton.module.css';

//like page delete button for movies

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <button className={styles.button} onClick={onRemove}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default RemoveButton;
