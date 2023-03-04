import { Request, Response, NextFunction } from 'express'

const verifyRoles = (...allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.body?.roles) return res.sendStatus(401)

        const rolesArray: number[] = [...allowedRoles]
        const re: boolean[] = req?.body?.roles.map((role: number) => rolesArray.includes(role)).find((val: boolean) => val === true)
        if (!re) return res.sendStatus(401)
        next()
    }
}

export default verifyRoles