import React, { Component } from "react";

// // accessing data from "data.js" file.
// import items from "./data";

// importing "contentful" data to access that is coming from "contentful.com" dynamically
import Client from "./contentful";
Client.getEntries({
  content_type: "roomFinder", // name of the "content" type
}).then((response) => console.log(response.items));

// set up context api
const RoomContext = React.createContext();

class RoomProvider extends Component {
  //  data passing in RoomProvider to use them in different component.
  state = {
    // setting our sorted data in array a/c to filtering  // it store all info. @ our rooms
    rooms: [],
    // "sortedRooms" is passing into "RoomList"   // it stores sorted rooms a/c to filtering
    sortedRooms: [],
    // stores all features of rooms
    featuredRooms: [],

    loading: true, // during filtering more property in the state, So loading is 1st setup all properties (rooms[],sortedrooms[],featuredRooms[]) and at the end set the data or loading true

    // below type is a controlled input
    type: "all", // "type" is default type, b'z we set 1st select in "room Type" field
    capacity: 1, // default value assigned
    price: 0, // default value
    minPrice: 0, // default value
    maxPrice: 0, // default value
    minSize: 0, // default value
    maxSize: 0, // default value
    breakfast: false, // default value
    pets: false, // default value
  };

  // getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "roomFinder",
        order: "fields.price",
      });
      //"response" comes from 'contentful' and "items" is the response object
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      // below data is coming from "componentDidMount()" function
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // "Higher order component", we set up within the 'context'
  componentDidMount() {
    this.getData(); // run getData() function
  }

  formatData(items) {
    //  loop data we got from importing from
    let tempItems = items.map((item) => {
      //  accessing "id" from data.js
      let id = item.sys.id;
      // accessing images from data.js
      // mapping over images [] b'z return each img a/c to filtering
      let images = item.fields.images.map((image) => image.fields.file.url);

      // 'fields' is itself an object with more property, so creating a new object and copy all the fields different objects
      let room = { ...item.fields, images, id }; // adding 2-property - 1. by name of "id"   2. by name of images
      return room;
    });
    return tempItems;
  }

  // set up function() in "context.js" that's we'll use in 'single-room' page  ------ // //
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms]; // tempRooms == rooms[] in "state"
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    this.setState(
      // "this.setState" is 'synchronous'
      {
        [name]: value, // using dynamic variable in object
      },
      this.filterRooms // callback function and "this.setState" is 'synchronous', make sure to only run this, when "state" is actually change.
    ); // "this.filterRooms" depending whatever we're do in input changing the "filerRooms" value
  };

  filterRooms = () => {
    // here we want to render "rooms"   not  'sortedRooms'  i.e: we set in "state" as rooms: [] the original value that we have.
    // b'z the changes we're going to make in sortedRooms but we want to go in original values that's why we want to access "rooms".

    // use "let" b'z we're doing override our value
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;

    //  all the rooms
    let tempRooms = [...rooms]; // [...rooms] data comes from this.state destructuring

    //  converting 'string' to 'number' for "RoomFilter.js" room capacity
    capacity = parseInt(capacity); // we override our "capacity" value of let var. objects

    // converting 'number' for "price" for "roomFilter.js"
    price = parseInt(price); // overriding price and convert them into number from string, b'z <input /> bydefault takes 'input' in string

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    // change state
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      // object destructuring to get the whole data of state.
      <RoomContext.Provider
        value={{
          ...this.state, // updating data into the state
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

// create a consumer, to access data.
const RoomConsumer = RoomContext.Consumer;
// 1. withRoomConsumer()  2.ConsumeWrapper() these are function that grabs some "props" going to set up higher order function component
// "withRoomConsumer" is function in which we passed (Component) within the function RoomContainer.js <RoomContainer /> == function withRoomConsumer(Component)
export function withRoomConsumer(Component) {
  /* run "withRoomConsumer(Component)" with consumer within 'RoomsContainer.js' */
  return function ConsumeWrapper(props) {
    return (
      // <RoomConsumer /> function return a "value
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
