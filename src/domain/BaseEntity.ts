export class BaseEntity {
    constructor(
        private id: number,
        private createdAt: Date,
        private updatedAt: Date
    ) { }
}
