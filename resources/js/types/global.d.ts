import type { route as routeFn } from 'ziggy-js';
import { Approval, SettingApproval, Users } from "@/types";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    approvals: Approval[];
    settingApproval: SettingApproval[];
    users: Users[];
  }
}


declare global {
    const route: typeof routeFn;
}
