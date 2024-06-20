import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const posts = [
    {
      thumbnail: '',
      title: 'Title',
      author: 'Name',
      ups: 24,
      date: '2024-06-18T09:45:00.00Z',
    },
    {
      thumbnail: '',
      title: 'Title 2',
      author: 'Name 2',
      ups: 44,
      date: '2024-06-14T14:44:00.00Z',
    },
    {
      thumbnail: '',
      title: 'Title 3',
      author: 'Name 3',
      ups: -22,
      date: '2024-06-01T23:23:00.00Z',
    },
  ];

  return (
    <ul className={style.list}>
      {posts.map((postData, i) => (
        <Post key={i} postData={postData} />
      ))}
    </ul>
  );
};
