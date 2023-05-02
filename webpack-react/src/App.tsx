import React from 'react';
import './App.css';

interface AppProps {
  [key: string]: any;
}

const App: React.FC<AppProps> = (props) => {
  return <div className="title">hello react</div>;
};

export default App;
