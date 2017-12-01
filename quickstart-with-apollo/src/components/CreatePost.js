import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
    const {createPostMutation, authorId} = this.props;
    console.log({title, description});
    await createPostMutation({variables: {title, description, authorId}});
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
      id,
      description,
      title,
    }
  }
`;

export default graphql(CREATE_POST_MUTATION, {
  name: 'createPostMutation',
  options: {
    refetchQueries: [
      'LastFivePosts',
    ],
  },
})(CreatePost);

