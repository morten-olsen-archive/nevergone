import { gql } from '@apollo/client';
const SEARCH = gql`
query {
  resources(input: { ids: ["morten"]}) {
    name
    assignments {
      name
      totalPrice(currency:"dkk")
      documents {id}
    }
    totalPrice(currency: "dkk")
  }
}
`;
