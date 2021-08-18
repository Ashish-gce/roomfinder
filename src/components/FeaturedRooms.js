import React, { Component } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
import Loading from "./Loading";
import Room from "./Room";

export default class FeaturedRooms extends Component {
  //  accessing data from context pai, "static contextType = MyContext/RoomContext" one way among different way of accessing context api
  static contextType = RoomContext;

  render() {
    // // accessing featuredRooms as/rename as rooms(alies)
    // "loading" getting from 'context'
    let { loading, featuredRooms: rooms } = this.context;
    // console.log(rooms);

    // //👍 mapping and rendering rooms, since this also we can do inside <Rooms /> component directly
    rooms = rooms.map((room) => {
      // "rooms" is of featuredRooms
      return <Room key={room.id} room={room} />; // returning room is wrapp insidde <Room /> component
    });

    return (
      <section className="featured-rooms">
        <Title title="Featured rooms" />
        <div className="featured-rooms-center">
          {/* if "loading" is true then show the 'spinner' but if "loading" is false then we display all the 'rooms' */}
          {loading ? <Loading /> : rooms}{" "}
          {/* loading-true  <Loading />  loading-false FeaturedRooms/rooms */}
        </div>
      </section>
    );
  }
}
