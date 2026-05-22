export const APP_ERROR_CODE = {
  CITY_NOT_FOUND: 'CITY_NOT_FOUND',
  API_KEY_MISSING: 'API_KEY_MISSING',
  RATE_LIMIT: 'RATE_LIMIT',
  NETWORK: 'NETWORK',
  UNKNOWN: 'UNKNOWN',
} as const

export type AppErrorCode = (typeof APP_ERROR_CODE)[keyof typeof APP_ERROR_CODE]

export class AppError extends Error {
  public readonly code: AppErrorCode

  public constructor(code: AppErrorCode, message: string) {
    super(message)
    this.code = code
    this.name = 'AppError'
  }
}
