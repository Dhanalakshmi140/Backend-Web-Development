
const assert = require("node:assert/strict");
const repository = require("./src/repositories/postRepository");
const service = require("./src/services/postService");

console.log("Case A: Read records");
console.log(service.listPosts());
console.log("Post 1:", service.getPost(1));
console.log("Missing post:", service.getPost(999));
assert.equal(service.listPosts().length, 2);
assert.equal(service.getPost(999), null);
console.log("Case A PASS");

console.log("\nCase B: Create record");
const created = service.createPost({
  title: "Storage boundary",
  body: "Use a repository",
  authorId: 7
});
console.log(created);
assert.equal(created.id, 3);
console.log("Case B PASS");

console.log("\nCase C: Update record");
console.log(service.updatePost(3, {
  title: "Updated boundary"
}));
console.log(service.getPost(3));
assert.equal(service.getPost(3).body, "Use a repository");
console.log("Case C PASS");

console.log("\nCase D: Remove twice");
console.log("First:", service.removePost(2));
console.log("Second:", service.removePost(2));
assert.equal(service.removePost(999), false);
console.log("Case D PASS");

console.log("\nCase E: Service validation");
try {
  service.createPost({ body: "No title", authorId: 7 });
  throw new Error("Expected validation error was not thrown");
} catch (error) {
  assert.equal(error.message, "Title is required");
  assert.equal(error.statusCode, 422);
  console.log("Message:", error.message);
  console.log("Status:", error.statusCode);
  console.log("Case E PASS");
}

console.log("\nCase F: Protect storage");
const copy = repository.findById(1);
copy.title = "Changed outside repository";

const listCopy = repository.findAll();
listCopy[0].title = "Changed through list";

console.log("Stored title:", repository.findById(1).title);
assert.equal(repository.findById(1).title, "First post");
console.log("Case F PASS");

console.log("\nAll test cases completed.");
