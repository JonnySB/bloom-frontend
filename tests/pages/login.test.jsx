import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";
import { Login } from "../../src/pages/Login/Login";


vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; 
    return { useNavigate: useNavigateMock };
    });
    vi.mock("../../src/services/authentication", () => {
    const loginMock = vi.fn();
    return { login: loginMock };
    });

    const completeLoginForm = async () => {
    const user = userEvent.setup();

    const username_emailInputEl = screen.getByPlaceholderText("Email or username");
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const submitButtonEl = screen.getByRole("button", { name: "Login" });

    await user.type(username_emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "1234");
    await user.click(submitButtonEl);
    };

    describe("Login", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });


    test("allows a user to login", async () => {
        render(<Login />);
        await completeLoginForm();
        expect(login).toHaveBeenCalledWith("test@email.com", "1234");
    });
    

    test("navigates to /posts on successful login", async () => {
        render(<Login />);
        login.mockResolvedValue("secrettoken123");
        const navigateMock = useNavigate();
        await completeLoginForm();
        expect(navigateMock).toHaveBeenCalledWith("/homepage");
    });


    test("navigates to /login on unsuccessful login", async () => {
        render(<Login />);
        login.mockRejectedValue(new Error("Error logging in"));
        const navigateMock = useNavigate();
        await completeLoginForm();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });
});
