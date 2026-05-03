export const fetchFunction = async (api, token) => {
  let res, data;

  try {
    res = await fetch(`${process.env.REACT_APP_URL}${api}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
  data = await res.json();
  if (res.status === 422) {
    alert(data.data);
    return;
  }
  if (!res.ok) {
    return new Error(res.message);
  }

  // console.log("data", data.data);
  return data.data;
};

// fetch(`${process.env.REACT_APP_URL}${api}`)
