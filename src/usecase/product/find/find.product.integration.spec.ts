import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";


describe('Integration test find product use case', () => {

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

    it('should find product', async () => {

        const product = new Product('1', 'Product 1', 100);
        const productRepository = new ProductRepository();
        
        
        await productRepository.create(product);

        const findProductUseCase = new FindProductUseCase(productRepository);
    
        const output = await findProductUseCase.execute(product);
    
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    
    })

})