import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { fetchPlants } from "../../src/services/plants";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("plants service", () => {
    test("fetch all plants species", async () => {

      const test_token = 'testToken'
      
      await fetchPlants(test_token);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/plants`);
      expect(options.method).toEqual("GET");
    });
});
