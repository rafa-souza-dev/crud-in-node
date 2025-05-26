export type ClientCreateInput = {
    name: string,
    email: string,
    phone: string
}

export type ClientUpdateInput = Partial<ClientCreateInput>
