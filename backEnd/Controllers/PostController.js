import PostModel from "../Models/postModel.js";

// Create
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.statu(500).json(error);
  }
};

// Get 1 post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Timeline Post
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const timelinePosts = await PostModel.find({});

    res.status(200).json(
      timelinePosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Edit
export const editPost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      const updatedPost = await PostModel.findById(postId);
      res.status(200).json(updatedPost);
    } else {
      res.status(403).json("Can't edit this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete
export const delPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId.toString() === userId) {
      await post.deleteOne({ _id: id });
      res.status(200).json(post);
    } else {
      res.status(403).json("Can't delete this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like and dislike
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
