import express from 'express'
import {ProductManager} from './ProductManager.js'

const app = express()

app.use(express.urlencoded({extended:true}))

const PORT = 8080
const products = new ProductManager()
const readProducts = products.readProducts()

app.get('/products', async(req, res) => {
    let limit = parseInt(req.query.limit)
    const allProds = await readProducts
    const limitProducts = allProds.slice(0, limit)
    if(limit){
        res.send(limitProducts)
    }
    else{
        res.send(allProds)
    }
})

app.get('/products/:pid', async(req, res) => {
    let pid = parseInt(req.params.pid)
    const allProds = await readProducts
    const findId = allProds.find( p => p.id === pid)
    if(findId){
        res.send(findId)
    }
    else{
        res.send('This Product does not exist')
    }
})

app.listen(PORT, () => {
    console.log(`Leyendo el puerto http://localhost:${PORT}`)
})