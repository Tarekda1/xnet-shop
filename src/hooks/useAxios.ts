import { useCallback, useReducer } from "react";

import { AxiosRequestConfig } from "axios";
import axios from "../providers/axios";
import AxiosError from "../types/AxiosError";

export interface AxiosState<R = any> {
  loading?: boolean | null;
  error?: Error | null;
  errorCode?: number | null;
  data?: R | null;
}

export const DefaultAxiosState: AxiosState = {
  loading: null,
  error: null,
  errorCode: null,
  data: null,
};

interface RequestConfig<REQ> extends AxiosRequestConfig {
  data?: REQ;
}

type CallAxiosFn<REQ, RES> = (config: RequestConfig<REQ>) => Promise<RES>;

function useAxios<REQ = any, RES = any>(): [
  CallAxiosFn<REQ, RES>,
  AxiosState<RES>
] {
  const reducer = (
    prevState: AxiosState<RES>,
    updatedProperty: AxiosState<RES>
  ) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [axiosState, setAxiosState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const callAxiosFn: CallAxiosFn<REQ, RES> = useCallback(async (config) => {
    // state on loading
    setAxiosState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios({
        headers: {
          Accept: "application/json",
          ...(config.headers || {}),
        },
        ...config,
      });

      // state on success
      setAxiosState({
        loading: false,
        error: null,
        data: response.data,
      });

      return response.data;
    } catch (e: any) {
      // state on error
      setAxiosState({
        loading: false,
        error: e,
        errorCode: e.response?.status,
        data: null,
      });

      throw new AxiosError(
        `AxiosError: ${config.method} ${config.url} failed, status: ${
          e.response?.status ?? "unknown"
        }, reqid: ${e.response?.data?.requestId ?? "unknown"}, error msg: ${
          e.response?.data?.errors[0]?.message
        }`,
        e.response
      );
    }
  }, []);

  return [callAxiosFn, axiosState];
}

export default useAxios;
