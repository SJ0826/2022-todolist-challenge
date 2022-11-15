export interface User {
  id?: number
  email: string
  token?: string
}

export interface UserParam {
  email: string
  password: string
  passwordCheck?: string // 회원가입할 때만 쓴다.
}

export interface UserValidation {
  email: boolean
  password: boolean
  passwordCheck?: boolean
}
