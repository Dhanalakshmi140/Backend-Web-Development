
const initialPosts = [
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

// Map storage: records are indexed by ID.
const posts = new Map(
  initialPosts.map((post) => [post.id, { ...post }])
);

let nextId = 3;

function findAll() {
  return Array.from(posts.values(), (post) => ({ ...post }));
}

function findById(id) {
  const post = posts.get(Number(id));
  return post ? { ...post } : null;
}

function create(fields) {
  const post = {
    id: nextId++,
    title: fields.title,
    body: fields.body ?? "",
    authorId: fields.authorId
  };

  posts.set(post.id, post);
  return { ...post };
}

function update(id, patch) {
  const post = posts.get(Number(id));
  if (!post) return null;

  const updated = { ...post };

  if (patch.title !== undefined) updated.title = patch.title;
  if (patch.body !== undefined) updated.body = patch.body;

  posts.set(Number(id), updated);
  return { ...updated };
}

function remove(id) {
  return posts.delete(Number(id));
}

/*
 * The repository contract allows storage to change without modifying services.
 * Future Prisma adoption requires async repository methods, Prisma client setup,
 * schema and migrations, transactions where needed, and integration tests.
 */

module.exports = { findAll, findById, create, update, remove };
