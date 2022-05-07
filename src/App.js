import Router from './Routing/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => (
  <>
    <Router />
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{
        fontFamily: 'Fira Sans',
      }}
    />
  </>
);

export default App;
