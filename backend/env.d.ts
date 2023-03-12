declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URI?: string
            SECRET_ACCESS_TOKEN?: string
            SECRET_REFRESH_TOKEN?: string,
            EMAIL: string
            EMAIL_PSWD: string
        }
    }
}

export {}