export interface CommentRequest {
    context: string,
    ticketId: number
}

export interface CommentResponse {
    readonly id: number,
    context: string,
    createdBy: string,
    ticketId: number,
    createdAt: Date
}