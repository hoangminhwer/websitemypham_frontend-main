import logo from './logo.svg';
import './App.css';
import AppRouter from './router/AppRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <AppRouter/>
      <ToastContainer />
    </div>
  );
}

export default App;
