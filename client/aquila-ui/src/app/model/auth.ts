export interface SignupRequest {
    email: string,
    username: string,
    password: string
}

export interface LoginRequest {
    username: string,
    password: string
}
 
export interface AuthResponse {
    username: string,
    role: string,
    authToken: string,
    refreshToken: string,
    createdAt: Date,
    expireAt: Date
}