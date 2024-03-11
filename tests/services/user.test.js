import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";
import {getUserInformationById, editUsersInformation, editUserAvatar} from "../../src/services/users"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


// Mock fetch function
createFetchMock(vi).enableMocks();


describe("User service", () => {
    test("Get user information by ID", async () => {
        fetch.mockResponseOnce(JSON.stringify({ user: [] }), 
        { status: 200 });
        await getUserInformationById(1);

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];
        const userId = "1";
        
        expect(url).toEqual(`${BACKEND_URL}/user_details/${userId}`);
        expect(options.method).toEqual("GET");

    });
    test("Rejects GET request with an error if the status is NOT 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 400 }
     
        );
        await expect(getUserInformationById(1)).rejects.toThrow("Error fetching userdetails");
    });



    
});