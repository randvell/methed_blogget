import {useDispatch} from 'react-redux';
import Header from './components/Header';
import Main from './components/Main';
import {getToken} from './api/token';
import {updateToken} from './store/token/action';
import ToastPortal from './UI/ToastPortal';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <>
      <Header />
      <Main />
      <ToastPortal />
    </>
  );
}

export default App;
