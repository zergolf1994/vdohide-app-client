import { auth } from "@/auth";
import SessionUser from "./session-user";

export default async function Home() {
  const user = await auth()
  return (
    <>Home
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <SessionUser />
    </>
  );
}
