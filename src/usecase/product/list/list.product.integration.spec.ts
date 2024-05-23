import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for listing product use case", () => {

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
    
    it('should list all products', async () => {
        const productRepository = new ProductRepository();

        const product1 = new Product('1', 'Product 1', 100);
        const product2 = new Product('2', 'Product 2', 200);

        productRepository.create(product1);
        productRepository.create(product2);


        const listProductUseCase = new ListProductUseCase(productRepository);

        const { products } = await listProductUseCase.execute();

        expect(products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });

        expect(products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price
        })

    });

})