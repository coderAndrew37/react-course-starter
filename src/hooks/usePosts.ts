import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageLimit: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = ({ pageParam = 1 }) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageLimit,
          _limit: query.pageLimit,
        },
      })
      .then((res) => res.data);

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < query.pageLimit) return undefined;
      return allPages.length + 1;
    },
  });
};

export default usePosts;
