export const submitFunction = async (api, method, body , token) => {
  let respone, data;

  try {
    respone = await fetch(`${process.env.REACT_APP_URL}${api}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  } catch (error) {
    console.log(error);
  }
  data = await respone.json();
  if (respone.status === 422) {
    alert(data.data);
    return;
  }
  if (!respone.ok) {
    return new Error(respone.message);
  }

  // console.log(data.data);
  return data.data;
};
