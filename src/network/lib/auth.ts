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

export function login(login: loginData){
    return axiosClient.post('/session', 
    {...login}
    )
}

export function logout(){
    return axiosClient.delete('/session');
}

export function introspect(){
    return axiosClient.get('/session').then(response => response.data as UserExtendedData)
}
