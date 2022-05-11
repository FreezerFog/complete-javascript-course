import { TIMEOUT_SEC } from './config';

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`(${res.status}) ${data.message}`);
    return data;
  } catch (err) {
    // Rethrow error here so it can be seen in the async function that uses this helper
    throw err;
  }
}
