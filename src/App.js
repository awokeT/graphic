import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={ <MainPage /> }/>
      <Route path='/*' element={ PageNotFound } />
    </Routes>

  );
}

export default App;
