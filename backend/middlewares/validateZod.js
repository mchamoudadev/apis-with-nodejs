export const validate = (schema) => (req, res, next) => {

    const result = schema.safeParse(req.body);

    console.log("result", result)

    if (!result.success) {
        const formatted = result.error.format();

        console.log("formatted", formatted)
        console.log(Object.keys(formatted))


        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.keys(formatted).map(field => ({
                field,
                message: formatted[field]?._errors?.[0] || 'Invalid input'
            }))
        })
    }
    next();
}