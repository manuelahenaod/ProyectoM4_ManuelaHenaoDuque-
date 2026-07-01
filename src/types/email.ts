import type { Task } from "./task";

export interface SendSummaryEmailRequest {
  email: string;
  name: string;
  tasks: Task[];
}

export interface SendSummaryEmailResponse {
  success: boolean;
  message: string;
}
