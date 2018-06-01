import gql from 'graphql-tag';

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($usernameOrEmail: String!, $password: String!) {
    login(data: {
      usernameOrEmail: $usernameOrEmail,
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

export const CREATE_BDC_ADMIN = gql`
  mutation newBDCAdmin(
    $email: String!,
    $username: String!,
    $password: String!,
    $firstName: String!,
    $middleName: String
    $lastName: String!,
    $locationId: String!,
    $phoneNumber: String!) {
    createAdmin(data: {
      email: $email,
      username: $username,
      password: $password,
      firstName: $firstName,
      middleName: $middleName,
      lastName: $lastName,
      locationId: $locationId,
      phoneNumber: $phoneNumber
    }) {
      name
    }
  }
`;

export const APPROVE_USER = gql`
  mutation approveUser($userId: String!) {
    approveUser(userId: $userId){
      username
      active
      id
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($userId: ID!) {
    deactivateUser(userId: $userId){
      username
      active
      id
    }
  }
`;


export const PREV_RATES = gql`
  query previousRates($cursor: ID) {
    viewer {
      user {
        ... on BDCOperator {
          previousRatesConnection(first: 90, after: $cursor) {
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
    usersConnection(first: 20, after: $cursor) {
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
