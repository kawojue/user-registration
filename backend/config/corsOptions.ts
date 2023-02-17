import { origins } from "./origins"

interface ICors {
    origin(origin:string, callback:any): void
    optionsSuccessStatus: number,
    credentials: boolean
}

const corsOptions: ICors = {
    origin: (origin: string, callback:any) => {
        if (origins.indexOf(origin) !== -1 || origin) {
            callback(null, true)
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions