const { useState } = require("react");

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      {/* Create New Post Form */}
      <section>
        <h2>New Posts</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <button type="submit">New Post</button>
        </form>
      </section>

      {/* Display All Posts */}
    </>
  );
}
