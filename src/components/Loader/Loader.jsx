// import { Watch } from 'react-loader-spinner';
// import s from './loader.module.css';

// const Loader = () => {
//   return (
//     <div className={s.loader}>
//      <Watch color="#242424" height={100} width={100} />
//     </div>
//   );
// };


import { Audio } from 'react-loader-spinner';
import css from './loader.module.css';
const Loader = () => {
  return (
    <div className={css.loader}>
      <Audio width="200" color="#4fa94d" />
    </div>
  );
};
export default Loader;