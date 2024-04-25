// import { useState, useEffect, useRef, useCallback } from "react";
// import type { ConsultType } from "@/types";
// import { useFetchPosts } from "@/hooks/useFetchPosts";

// const useInfiniteScroll = (
//   currentTab: string,
//   setPosts: React.Dispatch<React.SetStateAction<ConsultType[]>>
// ) => {
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const bottomOfPageRef = useRef<HTMLDivElement>(null);

//   const handleScroll = useCallback(() => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const clientHeight = document.documentElement.clientHeight;

//     if (scrollTop + clientHeight >= scrollHeight && !isLoading && hasMore) {
//       fetchMorePosts(page + 1);
//     }
//   }, [isLoading, hasMore, page]);

//   useEffect(() => {
//     let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

//     const handleScrollThrottled = () => {
//       if (!throttleTimeout) {
//         throttleTimeout = setTimeout(() => {
//           handleScroll();
//           throttleTimeout = null;
//         }, 500); // 500ms 간격으로 실행
//       }
//     };

//     window.addEventListener("scroll", handleScrollThrottled);

//     return () => {
//       window.removeEventListener("scroll", handleScrollThrottled);
//       if (throttleTimeout) {
//         clearTimeout(throttleTimeout);
//       }
//     };
//   }, [handleScroll]);

//   const fetchMorePosts = async (newPage: number) => {
//     setIsLoading(true);
//     const { data, error, count } = await useFetchPosts(currentTab, newPage);

//     if (error) {
//       console.error("Error fetching posts:", error);
//       setIsLoading(false);
//       return;
//     }

//     if (newPage === 1) {
//       setPosts(data as ConsultType[]);
//     } else {
//       setPosts((prevPosts) => [...prevPosts, ...(data as ConsultType[])]);
//     }

//     setPage(newPage);
//     setIsLoading(false);
//     setHasMore(count === 7);
//   };

//   return { isLoading, hasMore, fetchMorePosts, ref: bottomOfPageRef };
// };

// export default useInfiniteScroll;
