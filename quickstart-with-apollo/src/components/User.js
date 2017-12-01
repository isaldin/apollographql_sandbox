import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class User extends Component {
  render() {
    const {data: {loading, error, User}} = this.props;
    if (loading) {
      return <div>Loading...</div>
    } else if (User) {
      const {firstName, lastName} = User;
      return <div>{`${firstName} ${lastName}`}</div>
    }
    return <div>{error}</div>;
  }
}

User.fragments = {
  shortInfo: gql`
    fragment UserShortInfo on User {
      id,
      firstName,
      lastName,
    }
  `,
};

const USER_INFO_QUERY = gql`
  query UserQuery($userId:ID) {
    User(id:$userId) {
      ...UserShortInfo
    }
  }
  ${User.fragments.shortInfo}
`;

export default graphql(USER_INFO_QUERY, {
  options: ({userId}) => ({variables: {userId: 'cjammlzmgzyhq0112lqt44hjw'}}),
})(User);
