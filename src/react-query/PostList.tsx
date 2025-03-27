import usePosts from "../hooks/usePosts";

const PostList = () => {
  const { data: posts, error, isLoading } = usePosts();

  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <ul className="list-group">
      {posts?.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
