import { createClient } from "contentful";

// here we successfully exported our function with 2-parameter's
export default createClient({
  space: "f59a1f1bi6is", // this key is comes from contentful -> settings -> Api Key
  //  after giving name (required) copy the space id which is below of them

  accessToken: "gMqTvw43b-8WzSWIZCezx0hSD205cF5TlolDqIlgQKM", // Content Delivery API - access token
});
