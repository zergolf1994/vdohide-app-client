import { auth } from "@/auth";

export default async function Home() {
  const data = await auth()
  return (
    <>
      Welcome back <b>{data?.user.name}</b>
      <pre>{JSON.stringify({ ...data?.user }, null, 4)}</pre>
    </>
  );
}
