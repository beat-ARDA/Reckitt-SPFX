import { Category } from "../model/Common";
export declare class CategoryRepository {
    private static LIST_NAME;
    static GetById(id: number): Promise<Category>;
    static GetAll(): Promise<Category[]>;
    private static BuildEntity;
}
//# sourceMappingURL=CategoryRepository.d.ts.map