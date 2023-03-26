export interface IRoles {
    Employee?: string,
    Admin?: string,
    User: string
}

const roles: IRoles = {
    User: process.env.USER_CODE,
    Admin: process.env.ADMIN_CODE,
    Employee: process.env.EMPLOYEE_CODE
}

export default roles