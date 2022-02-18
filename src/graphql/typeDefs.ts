import { gql } from 'apollo-server';

enum TypeDefs {
  String = 'String!'
}

const typeDefs = gql`
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

export { typeDefs };
