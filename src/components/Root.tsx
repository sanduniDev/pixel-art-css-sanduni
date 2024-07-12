import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

interface RootProps {
  store: Store;
}

const Root: React.FC<RootProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App dispatch={undefined} />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default Root;
