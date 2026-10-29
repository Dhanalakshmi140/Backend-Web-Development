
const service = require("../services/postService");

function listPosts(req, res, next) {
  try {
    res.json(service.listPosts());
  } catch (error) {
    next(error);
  }
}

function getPost(req, res, next) {
  try {
    const post = service.getPost(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
}

function createPost(req, res, next) {
  try {
    const post = service.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

function updatePost(req, res, next) {
  try {
    const post = service.updatePost(req.params.id, req.body);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
}

function removePost(req, res, next) {
  try {
    const removed = service.removePost(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  removePost
};
