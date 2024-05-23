import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: '1',
    name: 'Product 1',
    price: 10
}

const MockRepository = () => {

    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };

}

describe('Unit test create product use case', () => {
    it('should create a product', async () => {
        
        const mockRepository = MockRepository();
        const createProductUserCase = new CreateProductUseCase(mockRepository);

        const output = await createProductUserCase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        });

    });
});