"use client";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

export const Providers = ({ children }: { children: any }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
};
