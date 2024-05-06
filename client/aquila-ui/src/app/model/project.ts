import { UserResponse } from "./user";

export interface ProjectRequest {
    name: string,
    code: string,
    description: string,
    teamMembers: string[]
}

export interface ProjectResponse {
    readonly id: number,
    code: string,
    name: string,
    description: string,
    ticketCount: number,
    teamMembers: UserResponse[]
}