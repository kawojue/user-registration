declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URI?: string
            PORT?: string
            SECRET_ACCESS_TOKEN?: string
            SECRET_REFRESH_TOKEN?: string
        }
    }
}

export {}