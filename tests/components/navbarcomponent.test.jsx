import { vi, describe, test, beforeEach, screen } from "vitest";
import userEvent from '@testing-library/user-event';
import { NavbarComponent } from "../../src/components/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { getUserInformationById } from "../../services/authentication";

vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; 
    return { useNavigate: useNavigateMock };
});


vi.mock("../../src/services/authentication", () => {
    const getUserInformationByIdMock = vi.fn();
    return { getUserInformationById: getUserInformationByIdMock };
});

describe("NavbarComponent", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.clear();
    });



    test("logs out user when logout button is clicked", async () => {
        localStorage.setItem("token", "testToken123");
        localStorage.setItem("id", "testUserID");
        
        render(<NavbarComponent />);
        userEvent.click(screen.getByText("Logout"));
        expect(localStorage.getItem("token")).toBeNull();
        expect(localStorage.getItem("id")).toBeNull();
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });
});