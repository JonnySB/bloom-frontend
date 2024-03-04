import { describe, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { getAllHelpRequestsWithUserDetails, getOneHelpRequestById} from "../../src/services/HelpRequests";

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
    })
});