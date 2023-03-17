import React from "react";

const Users = (props) => {
  return (
    <div className="user">
      <img src={props.imageUrl} alt={props.name + " " + props.lastName} />
      <div className="item">
        <h3>
          <span>{props.prefix}</span>
          {props.name} {props.lastName}
        </h3>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default Users;
