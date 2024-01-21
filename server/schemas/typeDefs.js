const typeDefs = `

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    credits: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Credit {
    userId: String
    credits: Int
  }
  
  input LineItemInput {
    price: String
    quantity: Int
  }

  type CheckoutSession {
    id: ID
    url: String
  }

  type Query {
    user(_id: ID!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateCredits(_id: ID!, credits: Int!): User
    createCheckoutSession(lineItems: [LineItemInput]): CheckoutSession

  }
`

module.exports = typeDefs
