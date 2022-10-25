import { ApolloServer } from '@apollo/server';
import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

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
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`express server`)
})

app.listen(port, () => {
  console.log(`[server] Running at http://localhost:${port}`)
})
