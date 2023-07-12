import React, { useContext } from 'react';
import Notes from './Notes';
import Addnote from './Addnote';
const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <Notes/>
      </div>
    </div>
  );
}

export default Home;
