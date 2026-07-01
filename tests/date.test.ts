import { describe, it, expect } from "vitest";
import { parseLocalDate, isSameDay, getTodayLocal } from "../src/utils/date";

describe("date utilities", () => {
  describe("parseLocalDate", () => {
    it("debería analizar un string de fecha local y retornar un objeto Date correcto", () => {
      const parsed = parseLocalDate("2026-06-30");
      expect(parsed.getFullYear()).toBe(2026);
      expect(parsed.getMonth()).toBe(5); // 0-indexed (junio es 5)
      expect(parsed.getDate()).toBe(30);
    });
  });

  describe("isSameDay", () => {
    it("debería retornar true si las fechas corresponden al mismo día", () => {
      const d1 = new Date(2026, 5, 30, 10, 0, 0);
      const d2 = new Date(2026, 5, 30, 18, 30, 0);
      expect(isSameDay(d1, d2)).toBe(true);
    });

    it("debería retornar false si las fechas corresponden a días diferentes", () => {
      const d1 = new Date(2026, 5, 30);
      const d2 = new Date(2026, 5, 29);
      expect(isSameDay(d1, d2)).toBe(false);
    });
  });

  describe("getTodayLocal", () => {
    it("debería retornar la fecha de hoy en formato YYYY-MM-DD", () => {
      const formatted = getTodayLocal();
      const today = new Date();
      const expectedMonth = String(today.getMonth() + 1).padStart(2, "0");
      const expectedDay = String(today.getDate()).padStart(2, "0");
      const expectedStr = `${today.getFullYear()}-${expectedMonth}-${expectedDay}`;
      
      expect(formatted).toBe(expectedStr);
    });
  });
});
