import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserNavbar from "../../src/components/EditComponents.jsx/UserDetailsComponent";

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("UserNavbar component interactions", () => {
    test("should open the edit profile modal when the Edit Profile button is clicked", async () => {
        const user = userEvent.setup();
        const userDetails = {
            id: "1",
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            email: "john@example.com",
            address: "123 Main St",
            avatar_url_string: "https://example.com/avatar.jpg"
        };

        render(<UserNavbar userDetails={userDetails} />);

        const editProfileButton = screen.getByRole("button", { name: "Edit Profile" });
        await user.click(editProfileButton);

        expect(screen.getByText("Edit your information")).toBeInTheDocument();
    });
    test("should allow user to change and submit their first name", async () => {
        const user = userEvent.setup();
        const mockRefreshUserData = vi.fn();
        const userDetails = {
            id: "1",
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            email: "john@example.com",
            address: "123 Main St",
            avatar_url_string: "https://example.com/avatar.jpg"
        };
    
        render(<UserNavbar userDetails={userDetails} refeshUserData={mockRefreshUserData} />);
        
        await user.click(screen.getByRole("button", { name: "Edit Profile" }));
        await user.click(screen.getByTestId("edit-firstName-btn"));
        const firstNameInput = document.querySelector('.edit-input');
        await user.clear(firstNameInput);
        await user.type(firstNameInput, "Jane");
        await user.click(screen.getByRole("button", { name: "Save Changes" }));

    });
    test("should open the edit avatar modal when the camera button is clicked", async () => {
        const user = userEvent.setup();
        const userDetails = {
            id: "1",
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            email: "john@example.com",
            address: "123 Main St",
            avatar_url_string: "https://example.com/avatar.jpg"
        };

        render(<UserNavbar userDetails={userDetails} />);

        const cameraName = document.querySelector('.edit-picture-btn');
        await user.click(cameraName);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        const fileInput = screen.getByLabelText(/upload file/i); 
        expect(fileInput).toBeInTheDocument();
    });
});