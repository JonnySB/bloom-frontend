import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";
import { Signup } from "../../src/pages/Signup/Signup";


vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; 
    return { useNavigate: useNavigateMock };
});


vi.mock("../../src/services/authentication", () => {
    const signupMock = vi.fn();
    return { signup: signupMock };
});


const completeSignupForm = async () => {
    const user = userEvent.setup();

    const firstNameInputEl = screen.getByPlaceholderText("First name");
    const lastNameInputEl = screen.getByPlaceholderText("Last name");
    const usernameInputEl = screen.getByPlaceholderText("Username");
    const emailInputEl = screen.getByPlaceholderText("Email");
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const confirmPasswordInputEl = screen.getByPlaceholderText("Confirm password");
    const addressInputEl = screen.getByPlaceholderText("Home address");
    const submitButtonEl = screen.getByRole("button", { name: "Sign Up" });

    await user.type(firstNameInputEl, "user");
    await user.type(lastNameInputEl, "name");
    await user.type(usernameInputEl, "user_name");
    await user.type(emailInputEl, "user@email.com");
    await user.type(passwordInputEl, "Password123!");
    await user.type(confirmPasswordInputEl, "Password123!");
    await user.type(addressInputEl, "An Address!");
    await user.click(submitButtonEl);
};

    describe("Signup Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });


    test("allows a user to signup", async () => {
        render(<Signup />);
        await completeSignupForm();
        expect(signup).toHaveBeenCalledWith("user", "name", "user_name", "user@email.com", "Password123!", "Password123!", "An Address!");
    });

    test("navigates to /login on successful signup", async () => {
        render(<Signup />);
        const navigateMock = useNavigate();
        await completeSignupForm();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });

    test("navigates to /signup on unsuccessful signup", async () => {
        render(<Signup />);
        signup.mockRejectedValue(new Error("Error signing up"));
        const navigateMock = useNavigate();
        await completeSignupForm();
        expect(navigateMock).toHaveBeenCalledWith("/signup");
    });
});