type ErrorProps = {
    message: string
}

export function Error({message} : ErrorProps) {
    return <p className="mt-1 alert alert-warning p-2 w-50">
        {message}
    </p>
}