import { IItemAddResult, sp } from "@pnp/sp/presets/all";
import { FlowType } from "../model/Common";

export class FlowApproversRepository {
    private static LIST_NAME: string = "Tipo Flujo Aprobacion";

    public static GetById(id: number): Promise<FlowType> {
        const entity = sp.web.lists.getByTitle(FlowApproversRepository.LIST_NAME)
            .items.getById(id).select(
                "ID",
                "Title",
            ).get().then((item) => {
                return FlowApproversRepository.BuildEntity(item);
            });

        return entity;
    }

    public static async GetAll(): Promise<FlowType[]> {
        const collection = sp.web.lists.getByTitle(FlowApproversRepository.LIST_NAME)
            .items.select(
                "ID",
                "Title",
            ).getAll().then((items) => {
                return items.map((item) => {
                    return FlowApproversRepository.BuildEntity(item);
                });
            });

        return collection;
    }

    private static BuildEntity(item: any): FlowType {
        let entity = new FlowType();

        entity.ItemId = item.ID;
        entity.Name = item.Title;

        return entity;
    }
}