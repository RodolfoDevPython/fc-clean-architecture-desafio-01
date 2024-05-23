import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product('1', 'Product 1', 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test find product use case', () => {

    it('should find product', async () => {
        const mockRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(mockRepository);
    
        const output = await findProductUseCase.execute(product);
    
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    
    })

})