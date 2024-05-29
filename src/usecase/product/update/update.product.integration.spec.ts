import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const product = new Product('1', 'Product 1', 200);

const input = {
    id: product.id,
    name: 'Product Update',
    price: 300
}

describe("Integration Test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it('should update product', async () => {

        const product = new Product('1', 'Product Name 1', 100);

        const productRepository = new ProductRepository();

        await productRepository.create(product);

        const findProduct = await productRepository.find(product.id);

        expect(findProduct).toEqual({
            _id: '1',
            _name: 'Product Name 1',
            _price: 100,
            notification: { "errors": [] },
        });

        product.changeName('Product Name 2');
        product.changePrice(300);

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const productUpdated = await updateProductUseCase.execute(product);

        expect(productUpdated).toEqual({
            id: product.id,
            name: 'Product Name 2',
            price: 300
        });

    });

});