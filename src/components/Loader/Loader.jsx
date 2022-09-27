import { Watch } from 'react-loader-spinner';
import s from './loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
     <Watch color="#242424" height={100} width={100} />
    </div>
  );
};

export default Loader;