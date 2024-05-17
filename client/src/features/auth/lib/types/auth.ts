export interface IUserInitialState {
    user: any | null,
    token: string | null
}


export interface IAuthRequest {
    email: string,
    password: string
}
export interface ILoginRequest extends IAuthRequest{}
export interface IRegisterRequest extends IAuthRequest{}