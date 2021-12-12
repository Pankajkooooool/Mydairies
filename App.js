import './App.css';
import React, {useContext} from 'react'
import Navbar from './components/Navbar';
import Rooutes from './components/Routes';
import Footer from './components/Footer';
import noteContext from './context/notes/noteContext';
import Alert from './components/Alert';

function App() {
  
  const context = useContext(noteContext)
  const {darkTheme,alert} = context;
  let darkmode = darkTheme.toString();

  
  
  return (
    <>
    <div className={ darkmode ==="true" ? "dark" :''}>
      <div className="bg-gray-100 dark:bg-gray-900  dark:text-gray-200 min-h-screen">
      <Navbar  />
      <Alert alert={alert} />
      <Rooutes  />
      <Footer />

      </div>
    </div>
    </>
  );
}

export default App;
