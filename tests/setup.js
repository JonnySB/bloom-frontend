// tests/setup.js
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Clear the DOM after each test
afterEach(() => {
  cleanup();
});
