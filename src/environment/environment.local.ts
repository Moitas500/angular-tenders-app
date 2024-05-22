enum role {
    admin = 'admin',
    employee = 'employee',
    everyone = 'everyone'
}

export const environment = {
    serviceHost: 'http://localhost:3001',
    role_user: role.admin
}