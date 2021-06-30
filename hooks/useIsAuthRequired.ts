import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

// redirect user to some other route if not logged in
export const useIsAuthRequired = (
  route: string = "/",
  ssr: boolean = false
) => {
  const { data, loading } = useMeQuery({ ssr });
  console.log("fetching?????");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`${route}?next=${router.pathname}`);
    }
  }, [loading, data, route, router]);

  return { data, loading };
};
