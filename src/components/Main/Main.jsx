import style from './Main.module.css';
import {Route, Routes} from 'react-router-dom';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import Modal from '../Modal';
import Home from './Home';
import Page404 from './Page404';
import AuthRedirect from './AuthRedirect';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Tabs />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/category/:page"
          element={
            <>
              <Tabs />
              <List />
            </>
          }
        >
          <Route path="post/:id/" element={<Modal />} />
        </Route>
        <Route path="/auth" element={<AuthRedirect />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  </main>
);
