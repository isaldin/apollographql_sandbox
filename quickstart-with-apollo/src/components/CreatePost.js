import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';
import {USER_POSTS_COUNT_QUERY} from './User';
import {LAST_POSTS_QUERY} from './RecentPosts';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handlePost = async () => {
    const {title, description} = this.state;
    const {submit, authorId} = this.props;
    await submit({title, description, authorId});
    this.setState({title: '', description: ''});
  };

  render() {
    return (
      <div className='pa4 flex justify-center bg-white'>
        <div style={{maxWidth: 400}} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.title}
            placeholder='Title'
            onChange={e => this.setState({title: e.target.value})}
            autoFocus
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={e => this.setState({description: e.target.value})}
          />
          {this.state.description &&
          this.state.title &&
          <button
            className='pa3 bg-black-10 bn dim ttu pointer'
            onClick={this.handlePost}
          >
            Post
          </button>}
        </div>
      </div>
    );
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($description: String!, $title: String!, $authorId: ID) {
    createPost(description:$description, title:$title, authorId:$authorId) {
      ...PostFragment
    }
  }
  ${Post.fragments.post}
`;

export default graphql(CREATE_POST_MUTATION, {
  props: ({ownProps, mutate}) => {
    return {
      submit: ({title, description, authorId}) => mutate({
        variables: {title, description, authorId},
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: 'asdfasdf',
            description,
            title,
            author: {
              id: authorId,
            },

          },
        },
        update: (proxy, {data: {createPost}}) => {
          // update last 5 posts
          const allPostsData = proxy.readQuery({query: LAST_POSTS_QUERY});
          const recentPosts = allPostsData.allPosts;
          recentPosts.shift();
          recentPosts.push(createPost);
          proxy.writeQuery({query: LAST_POSTS_QUERY, data: {allPosts: recentPosts}});

          // increment count of posts for current user
          const postsCount = proxy.readQuery({query: USER_POSTS_COUNT_QUERY, variables: {userId: authorId}});
          postsCount.User._postsMeta.count += 1;
          proxy.writeQuery({query: USER_POSTS_COUNT_QUERY, data: postsCount, variables: {userId: authorId}});
        },
      }),
    };
  },
  options: {
    refetchQueries: [
      //'LastFivePosts',
    ],
  },
})(CreatePost);

