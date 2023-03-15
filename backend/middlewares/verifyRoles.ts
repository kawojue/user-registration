import { Response, NextFunction } from 'express'

const verifyRoles = (...allowedRoles: number[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req?.roles) return res.sendStatus(401)

        const rolesArray: number[] = [...allowedRoles]
        const re: boolean[] = req?.roles.map((role: number) => rolesArray.includes(role)).find((val: boolean) => val === true)
        if (!re) return res.sendStatus(401)
        next()
    }
}

export default verifyRoles