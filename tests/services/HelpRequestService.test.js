import { describe, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { createHelpRequest, getAllHelpRequestsWithUserDetails, getAllRequestsByOneUser, getOneHelpRequestById} from "../../src/services/HelpRequests";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const mockHelpRequestId = "22";

createFetchMock(vi).enableMocks();

describe("Help Request Service", () => {
    describe("Get all help requests", () =>{
        test("Gets help requests with status code 200", async () => {
            // mock a fetch response
            fetch.mockResponseOnce(JSON.stringify({ helpRequests: [] }), 
            { status: 200 });
            await getAllHelpRequestsWithUserDetails();

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests2`);
            expect(options.method).toEqual("GET");
        });

        test("Rejects GET request with an error if the status is NOT 200", async () => {
            fetch.mockResponseOnce(
                JSON.stringify({ message: "Something went wrong" }),
                { status: 400 }
            );

            try {
                await getAllHelpRequestsWithUserDetails();
            } catch(error) {
                expect(error.message).toEqual("Failed to fetch all help requests with user details")
            }
        });
    })

    describe("Get one help request", () => {
        test("Successful get help request by id with status code 200", async () =>  {
            fetch.mockResponseOnce(JSON.stringify({}),{ status: 200 });
            await getOneHelpRequestById(mockHelpRequestId);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests/22`)
            expect(options.method).toEqual("GET");
        });

        test("Unsuccessful get help request by id when status NOT 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({message: "Something went wrong"}),{ status: 400 });

            try{
                await getOneHelpRequestById("");
            } catch(error){
                expect(error.message).toEqual("Failed to fetch help request with id "); // make sure there is a spave between id and "
            }
        });
    });

    describe("Create help request", () => {
        test("Successful POST request by user with status code 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({}),{ status: 200 });
            const token = "testToken"
            await createHelpRequest("Test title", "Test message", "2024-04-04", "2024-04-14", 100, 1, token);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests/create/1`)
            expect(options.method).toEqual("POST");
            expect(options.body).toEqual(
                JSON.stringify({ title: "Test title", message: "Test message", start_date: "2024-04-04", end_date: "2024-04-14", maxprice: 100})
            );
        });

        test("Unsuccessful POST reqyest by user when status NOT 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({message: "Something went wrong"}),{ status: 400 });
            try {
                await createHelpRequest("test token")
            } catch(error) {
                expect(error).toEqual("Unable to make POST request for create request")
            }
        });
    });

    describe("Get all requests by current user", () => {
        test("Successful GET request by current user with status 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({ helpRequests: [] }),{ status: 200 });

            const token = "testToken";
            const userId = "1";

            await getAllRequestsByOneUser(userId, token);
            
            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/help_requests/user/${userId}`);
            expect(options.method).toEqual("GET");
        });
        test("Unsuccessful GET request with missing fields when status NOT 200", async () => {
            fetch.mockResponseOnce(JSON.stringify({message: "Something went wrong"}),{ status: 400 });
            try{
                await getAllRequestsByOneUser();
            } catch(error){
                expect(error.message).toEqual("Unable to make GET request for get all requests by one user ");
            }
        });
    });
});