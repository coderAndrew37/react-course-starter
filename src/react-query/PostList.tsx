import React from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageLimit = 10;

  //Implementing catching using react-query
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageLimit });

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
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      </div>
    </>
  );
};

export default PostList;
