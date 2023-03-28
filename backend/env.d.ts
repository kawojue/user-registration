declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EMAIL: string
            USER_CODE: string
            EMAIL_PSWD: string
            ADMIN_CODE: string
            DATABASE_URI: string
            EMPLOYEE_CODE: string
            SECRET_ACCESS_TOKEN: string
            SECRET_REFRESH_TOKEN: string
        }
    }
}

export {}