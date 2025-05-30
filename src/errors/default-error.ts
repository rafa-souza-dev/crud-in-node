type DefaultErrorConstructor = {
    name: string
    message: string
    cause?: unknown
    details?: unknown
    statusCode: number
}

type DefaultErrorProps = {
    statusCode: number
    details?: unknown
}

type DefaultErrorResponse = {
    name: string
    status_code: number
    message: string
    details?: unknown
}

export class DefaultError extends Error {
    private readonly props: DefaultErrorProps

    constructor({
        name,
        message,
        statusCode,
        cause,
        details,
    }: DefaultErrorConstructor) {
        super(message, { cause })
        this.name = name
        this.props = { details, statusCode }
    }

    toResponse(): DefaultErrorResponse {
        return {
            name: this.name,
            message: this.message,
            status_code: this.props.statusCode,
            details: this.props.details,
        }
    }
}
