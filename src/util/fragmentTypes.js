import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fm = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Location"
          },
          {
            "name": "ComputedRate"
          },
          {
            "name": "BDCRate"
          },
          {
            "name": "BDCOperator"
          },
          {
            "name": "BDCAdmin"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "User",
        "possibleTypes": [
          {
            "name": "BDCOperator"
          },
          {
            "name": "BDCAdmin"
          }
        ]
      }
    ]
  }
}
});

export default fm;
