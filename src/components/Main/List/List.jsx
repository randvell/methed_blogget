import {useContext} from 'react';
import style from './List.module.css';
import Post from './Post';
import {postsContext} from '../../../context/postsContext';

export const List = () => {
  const {posts} = useContext(postsContext);

  return (
    <ul className={style.list}>
      {posts?.map((postData, i) => (
        <Post key={i} postData={postData} />
      ))}
    </ul>
  );
};
