import { domain } from "src/app/config/domain.ts";

export const transformUrl = (path: string) => `${domain}${path}`;
