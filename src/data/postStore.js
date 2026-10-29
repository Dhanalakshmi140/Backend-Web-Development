
let posts = [
  {
    id: 1,
    authorId: 7,
    title: "First post",
    body: "Repository boundaries protect change."
  },
  {
    id: 2,
    authorId: 8,
    title: "Second post",
    body: "Services should speak in domain language."
  }
];

let nextId = 3;

function findAll() {
  return posts;
}

function findById(id) {
  return posts.find((post) => post.id === Number(id)) || null;
}

function create(fields) {
  const post = {
    id: nextId++,
    title: fields.title,
    body: fields.body ?? "",
    authorId: fields.authorId
  };

  posts.push(post);
  return post;
}

function update(id, patch) {
  const post = findById(id);
  if (!post) return null;

  if (patch.title !== undefined) post.title = patch.title;
  if (patch.body !== undefined) post.body = patch.body;

  return post;
}

function remove(id) {
  const index = posts.findIndex((post) => post.id === Number(id));
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };
