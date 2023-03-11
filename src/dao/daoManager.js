const selectDB = process.env.DBSELECTION

export const getManagerMenssages = async ()=>{
    const modeloMensagge = selectDB === 1 ? await import('./MongoDB/models/Message.js'):
    await import('./PostgresSQL/models/Message.js')
    return modeloMensagge
}

export const getManagerProducts = async ()=>{
    const modeloProduct = selectDB === 1 ? await import('./MongoDB/models/Product.js'):
    await import('./PostgresSQL/models/Product.js')
    return modeloProduct
}

export const getManagerCart = async ()=>{
    const modeloCarrito = selectDB === 1 ? await import('./MongoDB/models/Cart.js'):
    await import('./PostgresSQL/models/Cart.js')
    return modeloCart
}