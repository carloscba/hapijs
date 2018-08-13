const validateAction = (event, actions) => {
    let valid = false
    if (event.limit === 'unique' && actions.count === 0) {
        valid = true
    } else if (event.limit === 'daily') {

        let sameDay = 0;
        actions.rows.map((item, index) => {
            isSameDay = moment(item.createdAt).isSame(moment(), 'day')
            if (isSameDay) {
                sameDay++
            }
        })
        valid = (sameDay < event.top)

    } else if (event.limit === 'top' && actions.count < event.top) {
        valid = true
    }
    return valid
}

module.exports = { validateAction }