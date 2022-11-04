import { useState, useEffect } from "react";
import LaunchesService from "../services/LaunchesService";
import ILaunchProps from "../types/Launches";

const useLaunches = (pageNum: number = 1) => {
  const [results, setResults] = useState<Array<ILaunchProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>({});
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    LaunchesService.getAllLaunches(pageNum)
      .then((data: any) => {
        setResults((prev) => [...prev, ...data.docs]);
        setHasNextPage(data.hasNextPage);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useLaunches;
