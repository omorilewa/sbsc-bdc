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
