// import express from "express";
// import cors from "cors";
// import { SERVER_CONFIG } from "../config/serverConfig.js";

// export const createExpressApp = (apolloServer) => {
//   const app = express();
//   app.use(cors());
//   app.use(express.json());

//   app.post(SERVER_CONFIG.GRAPHQL_PATH, async (req, res) => {
//     const httpGraphQLResponse = await apolloServer.executeHTTPGraphQLRequest({
//       httpGraphQLRequest: {
//         body: req.body,
//         method: req.method,
//         headers: req.headers,
//         search: req.url.split("?")[1] ?? "",
//       },
//       context: async () => ({}),
//     });

//     res.status(httpGraphQLResponse.status || 200);
//     httpGraphQLResponse.body?.forEach((chunk) => res.write(chunk));
//     res.end();
//   });

//   return app;
// };

import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js"; // Import the pubsub instance

import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";



export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Attach HTTP middleware
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ pubsub }),
    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async () => ({ pubsub }), // 👈 inject pubsub in WS context
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;