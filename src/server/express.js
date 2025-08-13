import express from "express";
import cors from "cors";
import { SERVER_CONFIG } from "../config/serverConfig.js";

export const createExpressApp = (apolloServer) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post(SERVER_CONFIG.GRAPHQL_PATH, async (req, res) => {
    const httpGraphQLResponse = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: req.body,
        method: req.method,
        headers: req.headers,
        search: req.url.split("?")[1] ?? "",
      },
      context: async () => ({}),
    });

    res.status(httpGraphQLResponse.status || 200);
    httpGraphQLResponse.body?.forEach((chunk) => res.write(chunk));
    res.end();
  });

  return app;
};