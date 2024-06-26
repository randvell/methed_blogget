import {useDispatch} from 'react-redux';
import Header from './components/Header';
import Main from './components/Main';
import {getToken} from './api/token';
import {updateToken} from './store/token/action';
import ToastPortal from './UI/ToastPortal';
import {Route, Routes} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Header />
            <Main />
            <ToastPortal />
          </>
        }
      />
    </Routes>
  );
}

export default App;
