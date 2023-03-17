import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./Users.jsx";
import { Link } from "react-router-dom";

const UserList = ({ childItem }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(21);

  useEffect(() => {
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${url}`
      )
      .then((res) => {
        setData(res.data.list);
      });
  }, [url]);
  console.log(data);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      if (url * 2 > 100) {
        setUrl(100);
      } else if (url == 100) {
        setPage(page + 1);
        setUrl(21);
      } else {
        setUrl(url + 21);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [url, page, data]);

  return (
    <div className="list">
      {data.map((item) => {
        return (
          <Link
            to={`/user/${item.id}`}
            onClick={() => childItem(item.id)}
            key={item.id}
          >
            <Users
              imageUrl={item.imageUrl + item.id}
              name={item.name}
              lastName={item.lastName}
              title={item.title}
              prefix={item.prefix}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
