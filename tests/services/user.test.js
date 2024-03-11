import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";
import { getUserInformationById, editUsersInformation, editUserAvatar } from "../../src/services/users";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("User service", () => {
    test("Get user information by ID", async () => {
        fetch.mockResponseOnce(JSON.stringify({ user: [] }), { status: 200 });
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

    describe("Edit user information", () => {
        test("Successful edit user's information and return an OK status", async () =>  {
            fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
            const token = "testToken";
            const form = {
                userId : "1",
                firstName : "FirstName",
                lastName : "LastName",
                userName : "UserName",
                email: "Email",
                address: "Address"
            }
            await editUsersInformation({
                userId: form.userId,
                firstName: form.firstName,
                lastName: form.lastName,
                userName: form.userName,
                email: form.email,
                address: form.address,
            }, token);

            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];
            
            expect(url).toEqual(`${BACKEND_URL}/edit_user_details/${form.userId}`);
            expect(options.method).toEqual("PUT");
            expect(options.body).toEqual(
                JSON.stringify({ first_name: "FirstName", last_name: "LastName", username: "UserName", email: "Email", address: "Address" })
            );
        });
    describe("Edit user information", () => {
            test("Rejects GET request with an error if the status is NOT 200", async () => {
                fetch.mockResponseOnce(JSON.stringify({ message: "Something went wrong" }), { status: 400 });
                const form = {
                    userId: "1", 
                    firstName: "FirstName",
                    lastName: "LastName",
                    userName: "UserName",
                    email: "Email",
                    address: "Address",
                };
                const token = "testToken";
        
                await expect(editUsersInformation(form, token)).rejects.toThrow("Failed to parse error response JSON.");
            });
        });
    });
});
