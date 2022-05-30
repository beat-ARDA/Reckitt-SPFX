import { IItemAddResult, sp } from "@pnp/sp/presets/all";

export class FlowApproversRepository {
    public static LIST_NAME: string = "Tipo Flujo Aprobacion";

    public static async GetFlowTypes(): Promise<Array<{ key: number, text: string }>> {
        let tiposFlujo: Array<{ key: number, text: string }> = [];

        await (await sp.web.lists.getByTitle(FlowApproversRepository.LIST_NAME).items.get()).map((dato) => {
            const tipoFlujo: { key: number, text: string } = { key: dato.ID, text: dato.Title };

            tiposFlujo.push(tipoFlujo);
        });

        return tiposFlujo;
    }
}