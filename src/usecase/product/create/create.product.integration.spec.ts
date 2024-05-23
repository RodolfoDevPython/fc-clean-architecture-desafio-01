import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe('Integration test create product use case', () => {

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

    it('should create a product', async () => {

        const product = new Product('1', 'Product Name 1', 200);

        const mockRepository = new ProductRepository();
        const createProductUserCase = new CreateProductUseCase(mockRepository);

        const output = await createProductUserCase.execute(product)

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

})