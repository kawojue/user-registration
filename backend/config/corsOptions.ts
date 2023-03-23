import { CorsOptions } from 'cors'
import { allowedUrl } from './allowedUrl'

const corsOptions: CorsOptions = {
    origin: allowedUrl,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST']
}

export default corsOptions