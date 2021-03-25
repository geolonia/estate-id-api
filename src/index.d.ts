declare namespace NodeJS {
  interface ProcessEnv {
    readonly ZOOM: string
    readonly AWS_DYNAMODB_API_KEY_TABLE_NAME: string
    readonly AWS_DYNAMODB_ESTATE_ID_TABLE_NAME: string
    readonly ACCESS_TOKEN_SALT: string
    readonly INCREMENTP_VERIFICATION_API_ENDPOINT: string
    readonly INCREMENTP_VERIFICATION_API_KEY: string
  }
}
