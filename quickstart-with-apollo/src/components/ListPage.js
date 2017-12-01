import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import User from './User';
import CreatePost from './CreatePost';
import RecentPosts from './RecentPosts';

class ListPage extends React.Component {

  render() {
    let blurClass = '';
    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (
      <div className={'w-100 flex-column justify-center pa6' + blurClass}>
        <div><User /></div>
        <div><CreatePost authorId='cjammlzmgzyhq0112lqt44hjw' /></div>
        <div><RecentPosts/></div>
      </div>
    )
  }
}

/* const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

const ListPageWithQuery = graphql(ALL_POSTS_QUERY, {
  name: 'allPostsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ListPage) */

export default ListPage;
