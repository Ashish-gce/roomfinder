import React from "react";
import { Link } from "react-router-dom"; // this link link-to a specific single page/FeaturedRooms.

// "defaultImag" importing b'z if any reason/problem actual image doesn't displaye then then default image is displayed
import defaultImg from "../images/room-1.jpeg";

// importing "PropTypes", b'z to check weather passing props is correct or not (in order of type checking)
import PropTypes from "prop-types";

export default function Room({ room }) {
  // object 'destructuring' prop by "room" i.e: comes from featuredRooms rooms.map(room- this room comes as prop)
  const { name, slug, images, price } = room;
  return (
    <article className="room">
      <div className="img-container">
        {/* if actual image not display then dispaly default image */}
        <img src={images[0] || defaultImg} alt="single room" />

        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        {/* "Link" to={}- b'z we're using variable that's variable is "slug"(/rooms/:slug) */}
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
        </Link>
      </div>
      {/* accessing all individual rooms name (what's that name) */}
      <div className="room-info">{name}</div>
    </article>
  );
}

// "propTypes" checking correct or not
Room.propTypes = {
  // <Room /> component has only-one prop i.e. "room" object
  room: PropTypes.shape({
    // .shape()- set up the object i.e: go one-by-one for checking property

    name: PropTypes.string.isRequired, // if "name" is not in 'string'that's why show "warning".
    slug: PropTypes.string.isRequired,
    // images are in 'array' and that's propTypes not string b'z this is an array. So we need to "arrayof(PropTypes.string)"
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
