import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Post from './Post';

const RecentPosts = ({data}) => {
  const {allPosts, loading} = data;
  return loading
    ? <div>Loading...</div>
    : allPosts.map(item => <Post key={item.id} itemId={item.id}/>);
};

export const LAST_POSTS_QUERY = gql`
  query LastFivePosts {
    allPosts(last: 5) {
      ...PostFragment
    }
  }
  ${Post.fragments.post}
`;

export default graphql(LAST_POSTS_QUERY)(RecentPosts);
