import { gql } from '@apollo/client';

// Add info
export const ADD_INFO = gql`
  mutation userinfo(
    $company_uen: String!
    $company_name: String!
    $full_name: String!
    $position: String!
    $email: String!
    $mobile: String!
    $documents: [String]!
  ) {
    insert_userinfo_one(
      object: {
        company_uen: $company_uen
        company_name: $company_name
        full_name: $full_name,
        position: $position,
        documents: $documents,
        email: $email,
        mobile: $mobile,
      }
    ){
      position
    }
  }
`;


// get all info
export const GET_INFO = gql`
query getInfo {
  userinfo(order_by: {date: asc}) {
    company_uen
    company_name
    email
    mobile
    position
    documents
    full_name
    id
  }
}
`;
