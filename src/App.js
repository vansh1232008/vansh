import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './webpages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Smart Cash Flow Manager</h1>
        </header>
        <main className="App-content">
          <Route exact path="/" component={Home} />
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 Smart Cash Flow Manager | Designed for optimal cash flow management</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
