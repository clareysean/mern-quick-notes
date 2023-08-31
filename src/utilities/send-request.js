import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};

    options.headers.Authorization = `Bearer ${token}`;
  }

  console.log(options);
  const res = await fetch(url, options);

  if (res.ok) return res.json();
  throw new Error("Bad Request");
}

// Fetch accepts an options object as the 2nd argument
// used to include a data payload, set headers, etc.

// Ensure the headers object exists

// Add token to an Authorization header
// Prefacing with 'Bearer' is recommended in the HTTP specification

// res.ok will be false if the status code set to 4xx in the controller action
