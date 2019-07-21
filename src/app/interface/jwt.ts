export interface Jwt {
    data: {
        id: number,
        name: string,
        email: string,
        token: string,
        expiresIn: string
      }
}
