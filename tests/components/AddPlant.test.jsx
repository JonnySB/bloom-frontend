import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPlant from "../../src/components/MyPlants/AddPlant";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("AddPlant component", () => {
    test("correctly fetch all plants species", async () => {
        const user = userEvent.setup()

        const userId = 1
        const userPlantList = ['1']
        fetch.mockResponseOnce(JSON.stringify([{ id: 1, common_name: "A houseplant" }, { id: 2, common_name: "Another houseplant" }]), {
            status: 200,
        });


        render(<AddPlant user_id={userId} user_plants={userPlantList} />);
        const button = screen.getByRole("button")
        await user.click(button)

        const selectField = screen.getByLabelText('Default select example')
        await user.click(selectField)

        const selectedPlant = screen.getByText('A houseplant')
        expect(selectedPlant).toHaveTextContent('A houseplant')

    });

    test("update plant quantity", async () => {
        const user = userEvent.setup()

        const userId = 1
        const userPlantList = [1]

        fetch.mockResponses(
            [JSON.stringify([{ id: 1, common_name: "A houseplant" }, { id: 2, common_name: "Another houseplant" }]), { status: 200 }],
            [JSON.stringify({ message: 'ok', token: 'testToken' }), { status: 200 }]
        )


        render(<AddPlant user_id={userId} user_plants={userPlantList} />);
        const button = screen.getByRole("button")
        await user.click(button)

        const selectField = screen.getByLabelText('Default select example')
        await user.click(selectField)

        const selectedPlant = screen.getByText('A houseplant')
        await user.click(selectedPlant)

        const quantityField = screen.getByLabelText('Enter quantity')
        await user.click(quantityField)
        await user.keyboard('1')

        const submitButton = screen.getByText("Save Changes")
        // await user.click(submitButton)

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];
    });
});
