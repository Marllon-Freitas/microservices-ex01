import axios from 'axios';

const postApi = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

const commentApi = axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

const queryApi = axios.create({
  baseURL: 'http://localhost:4002',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

export const fetchPostsAndComments = async () => {
  try {
    const response = await queryApi.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts and comments:', error);
    throw error;
  }
};

export const createPost = async (title: string) => {
  try {
    const response = await postApi.post('/posts', { title });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const createComment = async (postId: string, content: string) => {
  try {
    const response = await commentApi.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};