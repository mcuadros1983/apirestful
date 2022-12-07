const fs = require("fs");

module.exports = class Contenedor {
    constructor(archivo) {
        this.archivo = `./${archivo}.txt`
        this.array = []
    }

    async save(objeto) {
        let newId = 1
        try {
            const array = await this.getAll()
            if (array.length !== 0) {
                newId = array[array.length - 1].id + 1
            } else {
                newId
            }
            const data = { id: newId, ...objeto }
            array.push(data)
            this.array = array
            return data

        } catch (error) {
            return error;
        }
    }CLEAR

    async getById(id) {
        try {
            const array = await this.getAll()
            const producto = array.find(product => product.id === id);
            if (producto) {
                return producto
            } else {
                return { error: "producto no encontrado" }
            }

        } catch (error) {
            return null
        }
    }

    async getAll() {
        try {
            const array = this.array;
            return array;
        } catch (error) {
            this.array = [];
            return this.array
        }
    }

    async deleteById(id) {
        try {
            const array = await this.getAll()
            const producto = array.find(product => product.id === id);
            if (producto) {
                let newArray = array.filter((item) => item.id !== id);
                this.array = newArray
                return this.array
            } else {
                return null
            }
        } catch (error) {
            return error
        }
    }

    async deleteAll() {
        try {
            const array = await this.getAll()
            this.array = []
        } catch (error) {
            return null
        }
    }

    async updateById(id, object) {
        try {
            const array = await this.getAll()
            let index = array.map(producto => producto.id).indexOf(parseInt(id));

            if (index !== -1) {
                const eliminado = array.splice(index, 1, { id: parseInt(id), ...object })
                return array
            } else {
                return { error: "producto no encontrado" }
            }

        } catch (error) {
            return null
        }
    }
}