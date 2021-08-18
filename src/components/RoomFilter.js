import React from "react";
import { useContext } from "react"; // we're using "useContext" Hooks
import { RoomContext } from "../context"; // importing "RoomContext" only from "context.js"
import Title from "../components/Title";

// in order to get all unique values
const getUnique = (items, value) => {
  // "...new Set(...)" returns only 'unique' value.
  return [...new Set(items.map((item) => item[value]))];
};
const RoomFilter = ({ rooms }) => {
  // accessing Hooks context data
  const context = useContext(RoomContext);

  // objects destructuring i.e: received from "context" variable
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  //  get unique types
  let types = getUnique(rooms, "type"); // "rooms"- array checking and "type" what we're checking for
  types = ["all", ...types]; // we use spread operator
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
        {/*  display items dynamically */}
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type" /* "name" used b'z sending selected data to 'netlify' */
            id="type"
            value={type} // setting value for the type
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* end select type */}

        {/* guest capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Guest</label>
          <select
            name="capacity"
            id="capacity"
            // getting value from select box is "string"  So convert this into number
            // b'z room capacity is in 'number' not in string, and this changes happens in "context.js" file.
            value={capacity} // here we're setting value for the capacity
            className="form-control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* end guest capacity */}

        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            className="form-control"
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        {/* end of room price */}

        {/* size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of size */}

        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>

          {/* end of extras */}
          {/* pets */}
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
          {/* end of pets */}
        </div>
      </form>
    </section>
  );
};

export default RoomFilter;
