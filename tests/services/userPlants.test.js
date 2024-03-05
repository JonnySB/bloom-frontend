import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { assignPlant, updatePlantsQuantity } from "../../src/services/userPlants";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("plants service", () => {
    test("assign new plant to user", async () => {

      const test_token = 'testToken'
      
      await assignPlant(1, 1, 3, test_token);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/plants/user/assign`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ user_id: 1, plant_id: 1, quantity: 3}),
      );
    });

    test("update user's plant quantity", async () => {

      const test_token = 'testToken'
      
      await updatePlantsQuantity(1, 1, 3, test_token);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/plants/user/update`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ user_id: 1, plant_id: 1, new_quantity: 3}),
      );
    });
});
