const userTypeDef = `
type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    profilePicture: String
    gender: String!
    transactions: [Transaction!]
}

type Query {
    authUser: User
    user(userId:ID!): User
}

 type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
 }

 input SignUpInput {
    name : String!
    username: String!
    password: String!
    gender: String!
 }
 
 input LoginInput {
    username: String!
    password: String!
 }

 type LogoutResponse {
    message : String!
 }
`;

export default userTypeDef;
