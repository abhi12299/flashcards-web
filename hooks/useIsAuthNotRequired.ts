import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

// redirect user to some other route if logged in
export const useIsAuthNotRequired = (route: string = "/feed") => {
  const { data, loading, refetch } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && data?.me) {
      router.replace(route);
    }
  }, [loading, data, route, router]);

  return { data, loading, refetch };
};
