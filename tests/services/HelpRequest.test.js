import { describe, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { getAllHelpRequests,getHelpRequestById } from "../../src/services/HelpRequests";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const mockHelpRequestId = "22";

createFetchMock(vi).enableMocks();

// vi.mock("../../src/services/HelpRequests", () => {
//     const getUserByIdMock = vi.fn();
//         // return Promise.resolve({ id, name: "Test User" });
//     return {getUserById : getUserByIdMock}

// });

describe("Help Request Service", () => {
    // describe("Get all help requests", () => {
    //     test("Gets help requests with status code 200", async () => {
    //         // mock a fetch response
    //         fetch.mockResponseOnce(JSON.stringify({ helpRequests: [] }), 
    //         { status: 200 });

    //         await getAllHelpRequests();

    //         const fetchArguments = fetch.mock.lastCall;
    //         const url = fetchArguments[0];
    //         const options = fetchArguments[1];

    //         expect(url).toEqual(`${BACKEND_URL}/help_requests`);
    //         expect(options.method).toEqual("GET");
    //     });

    //     test("Rejects GET request with an error if the status is NOT 200", async () => {
    //         fetch.mockResponseOnce(
    //             JSON.stringify({ message: "Something went wrong" }),
    //             { status: 400 }
    //         );
    //         try {
    //             await getAllHelpRequests();
    //         } catch(error) {
    //             expect(error.message).toEqual("Failed to fetch all help requests")
    //         }
    //     });
    // });

    describe("Get one help request", () => {
        test("Successful get help request by id with status code 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({}),{ status: 200 });
            
            await getHelpRequestById(mockHelpRequestId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests/22`)
            expect(options.method).toEqual("GET");
        });
        
        test("Unsuccessful get help request by id when status NOT 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({message: "Something went wrong"}),{ status: 400 });
            try{
                await getHelpRequestById("");
            } catch(error){
                expect(error.message).toEqual("Failed to fetch help request");
            }
        })
    })

    // describe("Get all help requests with users", () => {
    //     test("Gets help requests with status code 200", async () => {
    //         fetch.mockResponseOnce(JSON.stringify([{ id: 1, user_id: "user1" }]), { status: 200 });

    //         const helpRequestsWithUsers = await getAllHelpRequestsWithUsers();

    //         expect(helpRequestsWithUsers).toEqual([{ id: 1, user_id: "user1", user: { id: "user1", name: "Test User" } }]);
    //         const fetchArguments = fetch.mock.lastCall;
    //         const url = fetchArguments[0];
    //         const options = fetchArguments[1];

    //         expect(url).toEqual(`${BACKEND_URL}/help_requests`);
    //         expect(options.method).toEqual("GET");
    //     });

    //     test("Rejects GET request with an error if the status is NOT 200", async () => {
    //         fetch.mockResponseOnce(JSON.stringify({ message: "Something went wrong" }), { status: 400 });

    //         try {
    //             await getAllHelpRequestsWithUsers();
    //         } catch (error) {
    //             expect(error.message).toEqual("Failed to fetch all help requests");
    //         }
    //     });
    // });
});