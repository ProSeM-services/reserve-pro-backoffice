import { z } from "zod";

const EnterpriseSchema = z.object({});

export type IApiEnterprise = z.infer<typeof EnterpriseSchema>;
