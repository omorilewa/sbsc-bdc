import gql from 'graphql-tag';

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    login(data: {
      usernameOrEmail: $username,
      password: $password
    }) {
      token
      user {
        username
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query location {
    locations {
      id
      name
    }
  }
`;

export const CREATE_BDC_OPERATOR = gql`
  mutation newBDCoperator($email: String!,
    $username: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $locationId: String!,
    $phoneNumber: String!) {
    createBDCOperator(data: {
      email: $email,
      username: $username,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      locationId: $locationId,
      phoneNumber: $phoneNumber
    }) {
      name
      location {
        name
      }
    }
  }
`;

export const APPROVE_USER = gql`
  mutation approveUser($userId: String!) {
    approveUser(userId: $userId){
      username
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($userId: ID!) {
    deactivateUser(userId: $userId){
      username
    }
  }
`;


export const PREV_RATES = gql`
  query previousRates($cursor: ID) {
    viewer {
      user {
        ... on BDCOperator {
          previousRatesConnection(first:20, after: $cursor) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            edges {
              cursor
              node {
                id
                rate {
                  buyRate
                  sellRate
                  periodOfDay
                  currency
                }
                date
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    }
  }
`;


export const ADD_BDC_RATE = gql`
  mutation newRate($buyRate: Float!, $sellRate: Float!, $currency: CURRENCY!) {
    newBDCRate(data: {
      buyRate: $buyRate
      sellRate: $sellRate
      currency: $currency
    }){
      date
      rate {
        buyRate
        sellRate
        currency
        periodOfDay
      }
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_USERS = gql`
  query users($cursor: ID) {
    usersConnection(first: 15, after: $cursor) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          ... on BDCOperator {
            id
            email
            username
            name
            active
          }
          ... on BDCAdmin {
            id
            email
            username
            name
            active
          }
        }
      }
    }
  }
`;
