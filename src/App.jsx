import "./App.css";
import React, { useState } from "react";
import UserList from "./components/UserList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";

const App = () => {
  const [id, setId] = useState();
  const childItem = (item) => {
    setId(item);
  };
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<UserList childItem={childItem} />} />
        <Route
          exact
          path={`/user/${id}`}
          element={<UserPage childItem={childItem} id={id} />}
        />
      </Routes>
    </div>
  );
};

export default App;
