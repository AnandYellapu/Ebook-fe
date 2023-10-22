import React from 'react';
import BookList from '../components/BookList';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="app-title">Welcome to the EBook Selling</h1>
      <BookList />
    </div>
  );
};

export default Home;



