"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
var TypeDefs;
(function (TypeDefs) {
    TypeDefs["String"] = "String!";
})(TypeDefs || (TypeDefs = {}));
const typeDefs = (0, apollo_server_1.gql) `
  type Query {
    sayHi: ${TypeDefs.String}
  }

  type User{
    _id: ID!
    email: String!
    username: String!
    createdAt: String!
  }

  type Login{
    token: String!
    id: ID!
  }

  input RegisterInput{
    username: ${TypeDefs.String}
    password: ${TypeDefs.String}
    email: ${TypeDefs.String}
  }

  input LoginInput{
    email: ${TypeDefs.String}
    password:  ${TypeDefs.String}
  }

  type Mutation{
    register(registerInput: RegisterInput): User
     login(loginInput: LoginInput!): Login
  }
  

`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map