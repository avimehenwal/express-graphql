import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from '@prisma/client';
import pkg from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import { authResolvers } from "./authResolvers";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const prisma = new PrismaClient()

dotenv.config();
const { json } = pkg;

export interface IContext {
  auth: boolean;
  token: string;
}

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

const authServer = new ApolloServer({
  typeDefs,
  resolvers: authResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await authServer.start();
app.use(
  "/auth",
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(authServer, {
    // @ts-ignore
    context: ({ req }) => {
      // console.dir(req.headers)
      return {
        auth: req.headers.authorization ? true : false,
        token: req.headers.authorization
      };
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
console.log(`🚀 Server ready at http://localhost:${port}/auth`);