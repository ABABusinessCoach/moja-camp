import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification modules
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const baseClientEnrollment = {
  childFirstName: "Alex",
  childLastName: "Smith",
  childAge: "6",
  parentName: "Jamie Smith",
  parentEmail: "jamie@example.com",
  parentPhone: "555-1234",
  plannedAbsences: "None planned",
  emergencyName: "Pat Smith",
  emergencyPhone: "555-5678",
};

const baseCommunityEnrollment = {
  childFirstName: "Jordan",
  childLastName: "Lee",
  childAge: "7",
  parentName: "Casey Lee",
  parentEmail: "casey@example.com",
  parentPhone: "555-9999",
  emergencyName: "Robin Lee",
  emergencyPhone: "555-8888",
};

const baseNewClientEnrollment = {
  childFirstName: "Taylor",
  childLastName: "Brown",
  childAge: "5",
  parentName: "Morgan Brown",
  parentEmail: "morgan@example.com",
  parentPhone: "555-7777",
  primaryConcerns: "Communication delays",
  servicesInterest: ["Applied Behavior Analysis (ABA)"],
};

describe("enrollment.submitClientEnrollment", () => {
  it("returns success for a valid client enrollment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.enrollment.submitClientEnrollment(baseClientEnrollment);
    expect(result).toEqual({ success: true });
  });

  it("throws on missing required fields (handled by zod)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.enrollment.submitClientEnrollment({
        ...baseClientEnrollment,
        childFirstName: "",
      })
    ).rejects.toThrow();
  });
});

describe("enrollment.submitCommunityEnrollment", () => {
  it("returns success for a valid community enrollment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.enrollment.submitCommunityEnrollment(baseCommunityEnrollment);
    expect(result).toEqual({ success: true });
  });

  it("throws on invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.enrollment.submitCommunityEnrollment({
        ...baseCommunityEnrollment,
        parentEmail: "not-an-email",
      })
    ).rejects.toThrow();
  });
});

describe("enrollment.submitNewClientEnrollment", () => {
  it("returns success for a valid new client enrollment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.enrollment.submitNewClientEnrollment(baseNewClientEnrollment);
    expect(result).toEqual({ success: true });
  });

  it("throws on missing parent email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.enrollment.submitNewClientEnrollment({
        ...baseNewClientEnrollment,
        parentEmail: "",
      })
    ).rejects.toThrow();
  });
});
