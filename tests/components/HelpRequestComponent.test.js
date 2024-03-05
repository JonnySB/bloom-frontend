import { render, screen } from "@testing-library/react";
import HelpRequest from "../../src/components/HelpRequest/HelpRequest";

const mockProps = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    date: '2022-03-15',
    title: 'Test Title',
    message: 'Test Message',
    start_date: '2022-03-15',
    end_date: '2022-03-20',
    maxprice: 50.0,
    showButtonView: true,
    showButtonOffer: true
};

describe("Help request tests", () => {
    test("displays content of help request", () => {
        render(<HelpRequest 
            first_name={mockProps.first_name}
            last_name={mockProps.last_name}
            username={mockProps.username}
            date={mockProps.date}
            title={mockProps.title}
            message={mockProps.message}
            start_date={mockProps.start_date}
            end_date={mockProps.end_date}
            maxprice={mockProps.maxprice}
            showButtonView={mockProps.showButtonView}
            showButtonOffer={mockProps.showButtonOffer}
        />);

        const pTag = screen.getByRole('firstnameAndLastname');
        console.log("The pTag ====> ", pTag)
        expect(pTag.textContent).toEqual("John Doe");
    });
});
