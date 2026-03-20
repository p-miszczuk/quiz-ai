import { Brand } from "./brand";

export type UserId = Brand<string, "UserId">;

export interface User {
  id: UserId;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
