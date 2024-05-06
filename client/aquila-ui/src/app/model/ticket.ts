import { UserResponse } from "./user";

export interface TicketRequest {
    title: string,
    description: string,
    priority: string,
    assignees: string[],
    projectId: number
}

export interface TicketResponse {
    readonly id: number,
    title: string,
    description: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    priority: string,
    status: string,
    reportedBy: UserResponse | null,
    assignees: UserResponse[],
    readonly projectId: number,
    projectCode: string,
    commentCount: number
}