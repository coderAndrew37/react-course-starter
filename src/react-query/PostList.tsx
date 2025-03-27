import { useState } from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageLimit = 10;
  const [page, setPage] = useState(1);

  //Implementing catching using react-query
  const { data: posts, error, isLoading } = usePosts({ page, pageLimit });

  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between mt-3">
        <button
          disabled={page === 1}
          className="btn btn-primary"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          previous
        </button>

        <button
          disabled={!posts || posts.length < pageLimit}
          className="btn btn-primary"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          next
        </button>
      </div>
    </>
  );
};

export default PostList;
