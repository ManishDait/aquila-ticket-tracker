export interface UserResponse {
    name: string,
    email: string,
    role: string,
    enabled: boolean
}

export interface UserRequest {
    name: string,
    email: string,
    role: string,
    password: string | null,
    enabled: boolean
}