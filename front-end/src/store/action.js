export const loginRequest = (mobile, token, userId, isAdmin , addContact) => {
  return {
    type: "LOGIN",
    mobile: mobile,
    token: token,
    userId: userId,
    isAdmin: isAdmin,
    addContact: addContact,
  };
};

export const loginFailed = (err) => {
  return {
    type: "LOGIN_FAILED",
    error: err,
  };
};

export const login = (mobile, password) => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_URL}/user/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((result) => {
            return dispatch(loginFailed(result.message));
          });
        } else {
          return response.json();
        }
      })
      .then(async (res) => {
        await dispatch(
          loginRequest(res.mobile, res.token, res.userId, res.isAdmin ,res.addContact)
        );
        // console.log("reeeeeees" , res);
      })

      .catch((e) => {
        console.log(e);
      });
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};
