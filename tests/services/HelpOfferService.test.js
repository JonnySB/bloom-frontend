import { describe, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import {createHelpOffer} from  "../../src/services/HelpOffers";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
createFetchMock(vi).enableMocks();

describe("Create Help Offer", () => {
    test("Successful create help offer with status 200", async () => {
        fetch.mockResponseOnce(JSON.stringify({}),{ status: 200 });

        const token = "testToken"
        const helpRequestId = "1"
        const user_id = "1"
        await createHelpOffer(helpRequestId, "my offer message", user_id, 20, token);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/help_offers/${helpRequestId}`)
        expect(options.method).toEqual("POST");
        expect(options.body).toEqual(
            JSON.stringify({ message: "my offer message", user_id: user_id, bid: 20})
        );
    });

});