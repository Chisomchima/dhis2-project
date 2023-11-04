let API_DASHBOARD_URL = process.env.REACT_APP_BASE_URL;

export async function request(url:string, method:string) {
  if (method === "GET") {
    return fetch(API_DASHBOARD_URL + url, {method})
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  }
}
