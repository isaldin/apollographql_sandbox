import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import User from './User';

const Post = ({itemId: id, title, description, author}) => {
  console.log({author});
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      {author && <div>{author.firstName}</div>}
      <hr/>
    </div>
  );
};

Post.fragments = {
  post: gql`
    fragment PostFragment on Post {
      id,
      description,
      title,
    }
  `,
};

const POST_QUERY = gql`
  query PostQuery($id: ID) {
    Post(id: $id) {
      ...PostFragment,
      author {
        ...UserShortInfo,
      },
    }
  }
  ${Post.fragments.post}
  ${User.fragments.shortInfo}
`;

export default graphql(
  POST_QUERY, {
    options: ({itemId}) => ({variables: {id: itemId}}),
    props: ({data: {loading, Post}}) => ({
      ...Post,
    }),
  },
)(Post);

/* `query LastFivePosts {
  allPosts(last: 5) {
    ...PostFragment
  }
}

fragment PostFragment on Post {
  description,
  title,
  ...CommentsFragment,
}

fragment CommentsFragment on Post {
  comments {
    ...CommentFragment
  }
}

fragment CommentFragment on Comment {
  id,
  isPublished,
  text,
}` */