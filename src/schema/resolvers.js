import { messageModule } from "../modules/message/index.js";

export const resolvers = {
    Query:{
        ...messageModule.Query,
    },
    Mutation:{
        ...messageModule.Mutation,
    },
};