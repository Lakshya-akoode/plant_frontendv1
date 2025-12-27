'use client';

import { useState, useEffect } from 'react';
import { getCommunityTableData, addCommunityAPI, addCommunityReactAPI } from '../../../api/frontend/community';
import { toast } from 'react-toastify';
const CommunityTab = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');

  // Mock discussion posts data
  const mockPosts = [
      {
        id: 1,
      user: {
        name: 'Eati Sinha',
        avatar: 'E',
        avatarColor: 'orange'
      },
      content: 'hello',
      date: '9/24/2025',
      likes: 0,
      dislikes: 0
      },
      {
        id: 2,
      user: {
        name: 'SonalMittal',
        avatar: 'S',
        avatarColor: 'orange'
      },
      content: 'haha',
      date: '9/29/2025',
      likes: 0,
      dislikes: 0
      },
      {
        id: 3,
      user: {
        name: 'Vikalp Tyagi',
        avatar: 'V',
        avatarColor: 'yellow'
      },
      content: '..',
      date: '10/3/2025',
      likes: 0,
      dislikes: 0
    }
  ];

  

  // User role colors
  

  // Avatar colors
  const getAvatarColor = (colorName) => {
    switch (colorName) {
      case 'orange': return '#ff8c00';
      case 'yellow': return '#ffd700';
      case 'blue': return '#007bff';
      case 'green': return '#28a745';
      default: return '#6c757d';
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await getCommunityTableData();
      console.log("data");
      console.log(response);
      
      const data = response.data || response;
      
      // Transform API data to match the component's expected format
      const transformedPosts = data.map((item) => {
        // Calculate likes and dislikes from likesDislikes array
        const likes = item.likesDislikes?.filter(reaction => reaction.type === 'like').length || 0;
        const dislikes = item.likesDislikes?.filter(reaction => reaction.type === 'dislike').length || 0;
        
        return {
          id: item._id,
          user: {
            name: item.user?.name || 'Anonymous User',
            avatar: (item.user?.name || 'A').charAt(0).toUpperCase(),
            avatarColor: 'orange'
          },
          content: item.comment,
          date: new Date(item.createdAt).toLocaleDateString('en-US'),
          likes: likes,
          dislikes: dislikes
        };
      });
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error loading community posts:', error);
      // Fallback to mock data if API fails
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      // Create FormData to send to the API
      const formData = new FormData();
      formData.append('comment', newPost);
      formData.append('userId', user._id);
      
      // Call the API to save the post
      const response = await addCommunityAPI(formData);
      console.log(response.data);
      
      // Transform the API response to match component format
      const newPostData = {
        id: response._id,
        user: {
          name: user?.name || 'Current User',
          avatar: (user?.name || 'U').charAt(0).toUpperCase(),
          avatarColor: 'orange'
        },
        content: response.data.comment,
        date: new Date(response.data.createdAt).toLocaleDateString('en-US'),
        likes: response.data.likes || 0,
        dislikes: response.data.dislikes || 0
      };

      // Add new post to the beginning of the list
      setPosts(prevPosts => [newPostData, ...prevPosts]);
      toast.success(response.message);
      setNewPost('');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to post your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await addCommunityReactAPI(postId, user._id, 'like');
      // Reload posts to get updated like/dislike counts
      await loadPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like the post. Please try again.');
    }
  };

  const handleDislike = async (postId) => {
    try {
      await addCommunityReactAPI(postId, user._id, 'dislike');
      // Reload posts to get updated like/dislike counts
      await loadPosts();
    } catch (error) {
      console.error('Error disliking post:', error);
      alert('Failed to dislike the post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="community-tab">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="community-tab">
      {/* Header */}
      <div className="community-header">
        <h2>All Discussions</h2>
        <span className="post-count">{posts.length} posts</span>
      </div>

      {/* Posts List */}
      <div className="posts-container">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`post-card ${index % 2 === 0 ? 'even' : 'odd'}`}
          >
            {/* User Avatar */}
            <div 
              className="user-avatar"
              style={{ backgroundColor: getAvatarColor(post.user.avatarColor) }}
            >
              {post.user.avatar}
        </div>

            {/* Post Content */}
            <div className="post-content">
              {/* User Info */}
              <div className="user-info">
                <span className="user-name">{post.user.name}</span>
                <span className="post-date">• {post.date}</span>
              </div>

              {/* Post Text */}
              <div className="post-text">
                {post.content}
            </div>

              {/* Post Actions */}
              <div className="post-actions">
              <button 
                  className="action-btn like-btn"
                  onClick={() => handleLike(post.id)}
              >
                  <span className="action-icon"><i className="fa-solid fa-heart"></i></span>
                  <span className="action-count">{post.likes}</span>
              </button>
                <button 
                  className="action-btn dislike-btn"
                  onClick={() => handleDislike(post.id)}
                >
                  <span className="action-icon"><i className="fa-solid fa-thumbs-down"></i></span>
                  <span className="action-count">{post.dislikes}</span>
                </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

      {/* New Post Input */}
      <div className="new-post-container">
        <div 
          className="current-user-avatar"
          style={{ backgroundColor: getAvatarColor('orange') }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'R'}
          </div>
        
        <form onSubmit={handlePostSubmit} className="new-post-form">
          <input
            type="text"
            placeholder="Share your thoughts with the community..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="post-input"
          />
          <button type="submit" className="send-btn">
            <span className="send-icon"><i className="fa-solid fa-arrow-up-long"></i></span>
          </button>
        </form>

      </div>

      
    </div>
  );
};

export default CommunityTab;