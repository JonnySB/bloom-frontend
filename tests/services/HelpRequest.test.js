import { describe, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { getAllHelpRequests } from "../../src/services/HelpRequests";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("Help Request Service", () => {
    describe("Get help requests", () => {
        test("Gets help requests with status code 200", async () => {
            // mock a fetch response
            fetch.mockResponseOnce(JSON.stringify({ helpRequests: [] }), {
                status: 200,
            });

            await getAllHelpRequests();

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests`);
            expect(options.method).toEqual("GET");
        });

        test("Rejects GET request with an error if the status is not 200", async () => {
            fetch.mockResponseOnce(
                JSON.stringify({ message: "Something went wrong" }),
                { status: 400 }
            );
            try {
                await getAllHelpRequests();
            } catch(error) {
                expect(error.message).toEqual("Failed to fetch all help requests")
            }
        });

        
    });
});