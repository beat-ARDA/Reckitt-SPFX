import { Type } from "../model/Common";
export declare class TypeRepository {
    private static LIST_NAME;
    static GetById(id: number): Promise<Type>;
    static GetByCategory(categoryId: number): Promise<Type[]>;
    private static BuildEntity;
}
//# sourceMappingURL=TypeRepository.d.ts.map