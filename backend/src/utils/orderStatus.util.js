const orderStatusFlow = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing"],
    processing: ["shipped"],
    shipped: ["delivered"],
    delivered: []
}

export const isValidOrderTransitionStatus = (currentStatus, nextStatus) => {
    return orderStatusFlow[currentStatus]?.includes(nextStatus) ?? false
}