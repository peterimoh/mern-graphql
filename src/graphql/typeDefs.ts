import { gql } from 'apollo-server';

enum TypeDefs {
  String = 'String',
}

const typeDefs = gql`


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
  }

  type Comment{
    id:  ID!
    body:  ${TypeDefs.String}
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

export { typeDefs };
