import { ApolloServer } from "@apollo/server";
import express, { Express } from "express";
import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import pkg from "body-parser";

dotenv.config();
const { json } = pkg;

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

const app: Express = express();
const port = process.env.PORT ?? 3000;
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server)
);

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
