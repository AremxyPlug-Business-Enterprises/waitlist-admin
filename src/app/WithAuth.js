/* eslint-disable react-hooks/rules-of-hooks */
// components/WithAuth.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const WithAuth = (Dashboard) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (!session) {
      router.push("/login"); // Redirect to login page if not authenticated
      return null;
    }

    return <Dashboard {...props} />;
  };
};

export default WithAuth;
