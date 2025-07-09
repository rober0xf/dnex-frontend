"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  // swr for get requests
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/hello",
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  // const [data, set_data] = useState({});
  // async function get_django_API_data() {
  //   const response = await fetch("http://127.0.0.1:8000/api/hello");
  //   const response_data = await response.json();
  //   set_data(response_data);
  // }
  // async function handleClick() {
  //   await get_django_API_data();
  // }
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
