// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (username_email, password) => {
  // Turns the email & password into a object variable
  const payload = {
    username_email: username_email,
    password: password,
  };

  // Turns the above object variable into JSON and stringify "payload" so that it is readable by our DB
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  // Get's tokens with above login details.
  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

  // Returns token if response is 201 otherwise throws an error. 201 means succesful request that led to creation of a resource (In this case a "token")
  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    return data.token;
  } else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`,
    );
  }
};

export const signup = async (
  first_name,
  last_name,
  username,
  email,
  password,
  password_confirm,
  address,
) => {
  const payload = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
    password_confirm: password_confirm,
    address: address,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`,
    );
  }
};

