export interface IUserInitialState {
    user: any | null,
    token: string | null
}


export interface IAuthRequest {
    email: string,
    password: string
}

export interface ILoginRequest extends IAuthRequest {
}

export interface IRegisterRequest extends IAuthRequest {
    full_name: string;
    confirm_password: string;
}

export interface INewUserRequest {
    name: string;
}