import { CorsOptions } from 'cors'
import { allowedLists } from './allowedLists'

const corsOptions: CorsOptions = {
    origin: allowedLists,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST']
}

export default corsOptions