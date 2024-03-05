import { vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavbarComponent } from '../../src/components/NavbarComponent';
import { getAllUserInfo } from '../../src/services/user';

vi.mock("../../src/services/user", () => {
    const getAllUserInfoMock = vi.fn();
    return { getAllUserInfo: getAllUserInfoMock};
});

describe('Navbar Component', () => {
    test('renders with no user information', () => {
        render(<NavbarComponent />);
        
        const greeting = screen.getByTestId("user-greeting");
        expect(greeting.textContent).toEqual("Hi You");
    });

    test('renders with user information when a token is present', async () => {
        localStorage.setItem("token", "testToken");
        const getAllUserInfoMock = [{ _id: "123", username: "Test user", profile_picture: "/path/to/profile_pic.jpg"}];
        getAllUserInfo.mockResolvedValue({ user: getAllUserInfoMock, token:"newtoken"});
        
        render(<NavbarComponent />);
        
        await waitFor(() => {
            const username = screen.getByTestId("user-greeting");
            expect(username.textContent).toEqual("Hi Test user");

            const profilePicture1 = screen.getByAltText("Profile Picture");
            expect(profilePicture1).toBeInTheDocument();
            expect(profilePicture1).toHaveAttribute('src', '/path/to/profile_pic.jpg');

            const dropDownPic = screen.getByAltText('Profile Picture');
            userEvent.click(dropDownPic);
            const dropdownMenu = screen.getByRole('menu');
            expect(dropdownMenu).toHaveClass('show');
        });
    });
});