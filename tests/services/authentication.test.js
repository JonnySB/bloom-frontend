import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { login, signup } from "../../src/services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("authentication service", () => {
  describe("login", () => {
    test("calls the backend url for a token", async () => {
      const testEmail = "user1@email.com";
      const testPassword = "Password123!";

      fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
        status: 201,
      });

      await login(testEmail, testPassword);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/token`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ username_email: testEmail, password: testPassword }),
      );
      expect(options.headers["Content-Type"]).toEqual("application/json");
    });

    test("returns the token if the request was a success", async () => {
      const testEmail = "user1@email.com";
      const testPassword = "Password123!";

      fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
        status: 201,
      });

      const token = await login(testEmail, testPassword);
      expect(token).toEqual("testToken");
    });

    test("throws an error if the request failed", async () => {
      const testEmail = "user1TEST@email.com";
      const testPassword = "Password123!";

      fetch.mockResponseOnce(
        JSON.stringify({ msg: "Bad username or password" }),
        {
          status: 401,
        },
      );

      try {
        await login(testEmail, testPassword);
      } catch (err) {
        expect(err.message).toEqual(
          "Received status 401 when logging in. Expected 201",
        );
      }
    });
  });

  describe("signup", () => {
    test("calls the backend url for a token", async () => {
      const first_name = "user";
      const last_name = "name";
      const username = "user_name";
      const email = "user@email.com";
      const password = "Password123!";
      const password_confirm = "Password123!";
      const address = "An Address!";

      fetch.mockResponseOnce("", {
        status: 201,
      });

      await signup(
        first_name,
        last_name,
        username,
        email,
        password,
        password_confirm,
        address,
      );

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/users`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          password: password,
          password_confirm: password_confirm,
          address: address,
        }),
      );
      expect(options.headers["Content-Type"]).toEqual("application/json");
    });

    test("returns nothing if the signup request was a success", async () => {
      const first_name = "user";
      const last_name = "name";
      const username = "user_name";
      const email = "user@email.com";
      const password = "Password123!";
      const password_confirm = "Password123!";
      const address = "An Address!";

      fetch.mockResponseOnce(JSON.stringify(), {
        status: 201,
      });

      const response = await signup(
        first_name,
        last_name,
        username,
        email,
        password,
        password_confirm,
        address,
      );

      expect(response).toEqual();
    });

    test("throws an error if the request failed", async () => {
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(JSON.stringify({ message: "Error" }), {
        status: 400,
      });

      try {
        await signup(testEmail, testPassword);
      } catch (err) {
        expect(err.message).toEqual(
          "Received status 400 when signing up. Expected 201",
        );
      }
    });
  });
});
