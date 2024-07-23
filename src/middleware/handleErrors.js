import createError from 'http-errors'

export const badRequest = (err,res) => {
    const error  = createError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}

export const internalServerError = (res) => {
    const error = createError.InternalServerError('có lỗi ở server')
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}

export const notFound = (err,res) => {
    const error = createError.NotFound('route không tồn tại')
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}