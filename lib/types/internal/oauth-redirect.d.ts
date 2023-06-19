export type _OAuthTokenData = {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: number,
    scope: string
}

export type _OAuthData = {
    tokenData: _OAuthTokenData
}