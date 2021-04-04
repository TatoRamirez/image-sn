import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_IMG_API, //uri api
  fetch,
});

const Link = setContext((_, { headers }) => {
  //Leer el storage
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",  //spread ...
    },
  };
});

const clientDeft = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: Link.concat(httpLink),
});

export default clientDeft;