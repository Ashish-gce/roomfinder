import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context"; // importing whole context

import StyledHero from "../components/StyledHero";

export default class SingleRooms extends Component {
  // how we can access the url parameter that we passed as /slug  <Link to={`/rooms/${slug}`} of rooms.js
  constructor(props) {
    // creating a constructor
    super(props);
    // console.log(this.props); // passing 'props' to grab the info. from the state

    // set up the states-
    // state's property that is used through out the project
    this.state = {
      slug: this.props.match.params.slug, // this is "unique" for each and every time when we're opening a single room page. b'z I'm getting for each and every room i.e: different
      defaultBcg, // default img if actual img is not loaded
    };
  }
  // access "context" of class component
  static contextType = RoomContext; // get "context" from RoomContext

  render() {
    // destructure the function of "getRoom"
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug); // now run that function
    // since, console.log(room); // o/p is "undefined" during 'navigating'

    // @@ indentify the issue, and catch undefined and solve the issue to render info. on singleRoom when room is undefined
    // delt issue of accessing slug
    if (!room) {
      // "room" is undefined
      return (
        <div className="error">
          <h3>no such room could be found.... </h3>
          {/* during api call from componentDidMount() method then happen 'loading' or anythings... */}
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    // object distructuring
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room;

    // in order to show unique image in "Single Room" (not duplication).
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        {/* "issue"- every time rendering any specific page that's image not changes. b'z, of using simple class (hero="roomsHero")- css property "see"
       fix the <Hero /> in order to dynamically accessing background images*/}

        <StyledHero img={images[0] || this.state.defaultBcg}>
          {/* <Hero hero="roomsHero"> */}
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
          {/* </Hero> */}
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info.</h3>
              <h6>price: ${price}</h6>
              <h6>size: ${size} SQFT</h6>
              <h6>
                max capacity:{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person `}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              {/*"breakfast" true then "free breakfast included"  otherwise not */}
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}> - {item} </li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
