import { describe, it, expect } from "vitest";
import { capitalizeFirstLetter } from "../src/utils/text";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter", () => {
    expect(capitalizeFirstLetter("hola mundo")).toBe("Hola mundo");
  });

  it("removes leading and trailing spaces", () => {
    expect(capitalizeFirstLetter("   tarea importante   ")).toBe(
      "Tarea importante"
    );
  });

  it("returns an empty string when the input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("returns an empty string when the input contains only spaces", () => {
    expect(capitalizeFirstLetter("     ")).toBe("");
  });

  it("does not modify an already capitalized text", () => {
    expect(capitalizeFirstLetter("Proyecto final")).toBe("Proyecto final");
  });

  it("keeps the rest of the text unchanged", () => {
    expect(capitalizeFirstLetter("tODO app")).toBe("TODO app");
  });
});