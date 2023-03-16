import { NextApiResponse } from "next";

export const handleResponse = <T>(res: NextApiResponse, data: T) =>
  res.status(200).json({ payload: data, isError: false });

type ApiError = {
  msg?: string;
  data?: any;
};
export const handleError = (
  res: NextApiResponse,
  err: ApiError,
  statusCode?: number
) => res.status(statusCode || 500).json({ error: err, isError: true });
