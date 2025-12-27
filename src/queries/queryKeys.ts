export const queryKeys = {
  companies: {
    all: ["companies"] as const,
    detail: (id: string) => ["companies", id] as const,
  },
  members: {
    all: ["members"] as const,
    detail: (id: string) => ["members", id] as const,
    free: ["members", "free"] as const,
    search: (value: string) => ["members", "search", value] as const,
  },
  services: {
    all: ["services"] as const,
    detail: (id: string) => ["services", id] as const,
    byMember: (memberId: string) => ["services", "member", memberId] as const,
  },
  customers: {
    all: ["customers"] as const,
    detail: (id: string) => ["customers", id] as const,
  },
  appointments: {
    all: ["appointments"] as const,
    list: (filters?: unknown) => ["appointments", filters] as const,
    detail: (id: string) => ["appointments", id] as const,
  },
  payments: {
    all: ["payments"] as const,
    detail: (id: string) => ["payments", id] as const,
  },
  paymentPlans: {
    all: ["paymentPlans"] as const,
    detail: (id: string) => ["paymentPlans", id] as const,
  },
  subscription: {
    byEnterprise: (enterpriseId: string) =>
      ["subscription", enterpriseId] as const,
  },
  stats: {
    customers: (start?: number, end?: number, year?: number) =>
      ["stats", "customers", { start, end, year }] as const,
    appointments: (start?: number, end?: number, year?: number) =>
      ["stats", "appointments", { start, end, year }] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
  enterprises: {
    all: ["enterprises"] as const,
    detail: (id: string) => ["enterprises", id] as const,
  },
};
