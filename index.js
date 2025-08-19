// // index.js
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// import { typeDefs } from "./src/schema/typeDefs.js";
// import { resolvers } from "./src/schema/resolvers.js";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginLandingPageLocalDefault()],
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀 Server ready at ${url}`);

import { createApolloServer } from "./src/server/express.js";

const httpServer = await createApolloServer(4000);

httpServer.listen(4000, () => {
  console.log(`🚀 Query/Mutation endpoint: http://localhost:4000/graphql`);
  console.log(`🚀 Subscription endpoint: ws://localhost:4000/graphql`);
});
