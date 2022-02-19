"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
var TypeDefs;
(function (TypeDefs) {
    TypeDefs["String"] = "String";
})(TypeDefs || (TypeDefs = {}));
const typeDefs = (0, apollo_server_1.gql) `


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

  type Post {
    body: ${TypeDefs.String}
    message: ${TypeDefs.String}
    id: String
    createdAt: String
    comments: [Comment]!
    likes: [Likes]!
    username: String
    user: String
    likeCount: Int!
    commentCount: Int!
  }

  type Comment{
    id:  ID!
    body:  ${TypeDefs.String}
    username: ${TypeDefs.String}
  }

  type Likes{
    id: ID!
    username:  ${TypeDefs.String}
    createdAt:  ${TypeDefs.String}
  }


  type Query {
    getPosts: [Post]
    getSinglePost(id: String!): Post
  }


  type Mutation{
    register(registerInput: RegisterInput): User
     login(loginInput: LoginInput!): Login!
     createPost(body: String!): Post!
     deletePost(id: String!): Post!
     createComment(postID: String!, body: String!): Post!
     deleteComment(postID:ID!, commentID: ID! ): Post!
     likePost(postID: ID!): Post!
  }
  

`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map