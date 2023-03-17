import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Users from "./Users";

const UserPage = ({ id, childItem }) => {
  const [data, setData] = useState({});
  const [dataAddress, setDataAddress] = useState({});
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(21);

  useEffect(() => {
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      )
      .then((res) => {
        setData(res.data);
        setDataAddress(res.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}}/${url}`
      )
      .then((res) => {
        setFriends(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      console.log("bootom");
      if (url * 2 > 100) {
        setUrl(100);
      } else if (url == 100) {
        setPage(page + 1);
        setUrl(21);
      } else {
        setUrl(url * 2);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [url, page, data]);

  return (
    <div className="content">
      <div className="profile">
        <img
          src={data.id !== undefined ? data.imageUrl + data.id : ""}
          alt={data.name + " " + data.lastName}
        />
        <div className="info">
          <div className="main">
            <h3>
              {data.prefix} {data.name} {data.lastName}
            </h3>
            <p>{data.title}</p>
          </div>
          <div className="personal">
            <p>
              <span>Email</span>: {data.email}
            </p>
            <p>
              <span>Ip Address</span>: {data.ip}
            </p>
            <p>
              <span>Job Area</span>: {data.jobArea}
            </p>
            <p>
              <span>Job Type</span>: {data.jobType}
            </p>
          </div>
        </div>
        <div className="address">
          <h3>
            {dataAddress.name} {dataAddress.suffix}
          </h3>
          <p>
            <span>City</span>: {dataAddress.city}
          </p>
          <p>
            <span>Country</span>: {dataAddress.country}
          </p>
          <p>
            <span>State</span>: {dataAddress.state}
          </p>
          <p>
            <span>Street Address</span>: {dataAddress.streetAddress}
          </p>
          <p>
            <span>ZIP</span>: {dataAddress.zipCode}
          </p>
        </div>
      </div>
      <Link to={`/user/${data.id}`}>
        {data.prefix} {data.name} {data.lastName}
      </Link>
      <div className="friends">
        <h3>Friends:</h3>
        <div className="list">
          {friends.map((item) => {
            return (
              <Link
                to={`/user/${item.id}`}
                onClick={() => {
                  childItem(item.id);
                  window.scrollTo(0, 0);
                }}
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
      </div>
    </div>
  );
};

export default UserPage;
