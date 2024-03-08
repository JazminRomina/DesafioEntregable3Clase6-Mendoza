import fs from 'fs'

export class ProductManager{
    constructor() {
        this.products = []
        this.path = './products.json'
    }

    static id = 0

    getProducts = async() => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    addProducts = async(title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || ! code || !stock){
            console.log('You forgot to put something.')
        }
        else{
            const found = this.products.find((array) => array.code === code)
            if (found){
               console.log('There are two products that had the same code.')
            }
            else{
                ProductManager.id++
                this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
            }
        }
    }

    readProducts = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }
}