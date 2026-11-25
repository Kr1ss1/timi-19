import { Link } from "react-router";
import type { Route } from "./+types/posts";
const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

export async function loader() {
  try {
    const res = await fetch(API_ENDPOINT);
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await res.json();
    return { posts: data };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw (
      new Response("Unable ot connect to posts service."),
      {
        status: 503,
        statusText: "Service Unavailable",
      }
    );
  }
}

export default function PostsPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  console.log("hello", posts);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ErorrBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <>
      <h1>Something went wrong</h1>
    </>
  );
}
