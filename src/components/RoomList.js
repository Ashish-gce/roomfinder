import React from "react";
import Room from "./Room";

// rooms as a props
export default function RoomList({ rooms }) {
  // during filtering if no rooms in "rooms" array props we get "'Empty'" array
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameter</h3>
      </div>
    );
  }

  //  if "rooms" props return something then returning below lines
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((item) => {
          return <Room key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
}
