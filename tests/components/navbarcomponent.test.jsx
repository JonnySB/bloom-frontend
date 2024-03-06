import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../src/components/Navbar/NavbarComponent";



vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
}));

vi.mock("../../src/services/authentication", () => ({
    login: async () => {
        return { id: "mockedUserId" };
    },
}));

describe("NavbarComponent", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("navigates to posts page when BLOOM is clicked", async () => {
        render(<NavbarComponent />);
        const bloomButton = screen.getByText("BLOOM");
        userEvent.click(bloomButton);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/posts");
    });

});










//     test("navigates to profile page when Profile link is clicked", async () => {
//         // Mock do ID do usuário
//         const mockUserId = "mockUserId";
//         window.localStorage.setItem("user_id", mockUserId);

//         // Renderiza o componente
//         render(<NavbarComponent />);

//         // Encontra e clica no link de perfil
//         const profileLink = screen.getByText("Profile");
//         userEvent.click(profileLink);

//         // Verifica se a navegação para a página de perfil foi chamada com o ID correto
//         const navigateMock = vi.useNavigate();
//         expect(navigateMock).toHaveBeenCalledWith(`/profile/${mockUserId}`);
//     });

//     test("navigates to login page when Logout link is clicked", async () => {
//         // Renderiza o componente
//         render(<NavbarComponent />);

//         // Encontra e clica no link de logout
//         const logoutLink = screen.getByText("Logout");
//         userEvent.click(logoutLink);

//         // Verifica se a navegação para a página de login foi chamada
//         const navigateMock = vi.useNavigate();
//         expect(navigateMock).toHaveBeenCalledWith("/login");
//     });
// });



//     test("logs out user when logout button is clicked", async () => {
//         localStorage.setItem("token", "testToken123");
//         localStorage.setItem("id", "testUserID");
        
//         render(<NavbarComponent />);
//         userEvent.click(screen.getByText("Logout"));
//         expect(localStorage.getItem("token")).toBeNull();
//         expect(localStorage.getItem("id")).toBeNull();
//         const navigateMock = useNavigate();
//         expect(navigateMock).toHaveBeenCalledWith("/login");
    // });