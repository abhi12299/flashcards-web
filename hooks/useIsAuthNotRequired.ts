import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserQuery } from "../generated/graphql";

// redirect user to some other route if logged in
export const useIsAuthNotRequired = (route: string = "/feed") => {
  const { data, loading, refetch } = useUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && data?.user) {
      router.replace(route);
    }
  }, [loading, data, route, router]);

  return { data, loading, refetch };
};
