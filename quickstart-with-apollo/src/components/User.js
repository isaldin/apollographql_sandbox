import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class User extends Component {
  render() {
    const {loading, errors, firstName, lastName, postsCount} = this.props;
    if (loading) {
      return <div>Loading...</div>
    } else if (User) {
      return <div>{`${firstName} ${lastName} (posts: ${postsCount})`}</div>
    }
    return <div>{errors}</div>;
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

export const USER_POSTS_COUNT_QUERY = gql`
  query UserPostsCount($userId:ID!) {
    User(id:$userId) {
      id,
      _postsMeta {
        count
      }
    }
  }
`;

const UserWithShortInfo = graphql(USER_INFO_QUERY, {
  name: 'shortInfo',
  options: {variables: {userId: 'cjammlzmgzyhq0112lqt44hjw'}},
  props: ({shortInfo: {loading, errors, User}}) => ({
    loading,
    errors,
    ...User,
  }),
});

const UserWithPostsCount = graphql(USER_POSTS_COUNT_QUERY, {
  name: 'postsCount',
  options: {variables: {userId: 'cjammlzmgzyhq0112lqt44hjw'}},
  props: ({postsCount: {User}}) => ({
    postsCount: User ? User._postsMeta.count : 0,
  }),
});

export default compose(
  UserWithShortInfo,
  UserWithPostsCount,
)(User);
