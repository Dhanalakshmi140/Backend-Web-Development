
const repository = require("../repositories/postRepository");

function listPosts() {
  return repository.findAll();
}

function getPost(id) {
  return repository.findById(id);
}

function createPost(fields) {
  if (!fields.title || !fields.title.trim()) {
    const error = new Error("Title is required");
    error.statusCode = 422;
    throw error;
  }

  return repository.create(fields);
}

function updatePost(id, patch) {
  if (
    patch.title !== undefined &&
    (typeof patch.title !== "string" || !patch.title.trim())
  ) {
    const error = new Error("Title is required");
    error.statusCode = 422;
    throw error;
  }

  return repository.update(id, patch);
}

function removePost(id) {
  return repository.remove(id);
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  removePost
};
