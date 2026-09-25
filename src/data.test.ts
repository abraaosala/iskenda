import { describe, expect, it } from "vitest";
import { COMPANY_INFO, SERVICES } from "./data";

describe("company data", () => {
  it("exposes canonical company info", () => {
    expect(COMPANY_INFO.name).toBe("IS KENDA");
    expect(COMPANY_INFO.address).toBe("Cabinda, Angola");
  });

  it("has at least the four core services", () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(4);
    expect(SERVICES.map((s) => s.id)).toEqual(
      expect.arrayContaining(["contabilidade", "fiscalidade", "grh", "organizacao-adm"]),
    );
  });
});
