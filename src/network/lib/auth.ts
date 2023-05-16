import { axiosClient } from "../axiosClient"

interface loginData{
    username: string,
    password: string
}

export interface UserExtendedData{
    id: number,
    username: string,
    dailyQuoins: number,
    weeklyQuoins: number,
    monthlyQuoins: number,
    dailyCount: number,
}

export interface SessionData{
    key: string | null,
    user: UserExtendedData | null
}

export function login(login: loginData){
    return axiosClient.post('/session', 
    {...login}
    ).then(response => response.data as SessionData)
}

export function logout(key: string | null){
    return axiosClient.delete('/session', {params: { key }});
}

export function introspect(){
    return axiosClient.get('/session').then(response => response.data as UserExtendedData)
}
