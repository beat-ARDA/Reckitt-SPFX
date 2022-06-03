import { concat } from "lodash";
import { PromoStatus } from "..";
import { Constants } from "../../..";
import { NotificacionsManager } from "../../../common/NotificacionsManager";
import { SecurityHelper } from "../../../common/SecurityHelper";
import { PromoRepository } from "../../../data";
import { FlowApproversRepository } from "../../../data/FlowApproversRepository";
import { WorkflowLogRepository } from "../../../data/WorkflowLogRepository";
import { FlowType } from "../../Common";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
import { Promo } from "../Promo";

export class ApprovalState extends PromoState {
    public async Initialize(): Promise<void> {
        const users = await this.GetCurrentStage().GetPendingUsers();

        await SecurityHelper.SetPromoPermissions(this.Entity.ItemId, [this.Entity.Client.KeyAccountManager.ItemId], this.GetCurrentStage().GetPendingUserIDs());

        await Promise.all(users.map(async (user) => {
            await NotificacionsManager.SendTaskAssignedNotification(this.Entity, user.Email, null, user.Value);
        }));
    }

    public GetStatusId(): number {
        return PromoStatus.Approval;
    }

    public GetStatusText(): string {
        return Constants.StatusTexts.Approval;
    }

    public async GetViewModel(): Promise<PromoViewModel> {
        let viewModel = new PromoViewModel(this.Entity);
        viewModel.ReadOnlyForm = true;
        const currentUser = await SecurityHelper.GetCurrentUser();
        viewModel.FlowsTypes = await FlowApproversRepository.GetAll();
        console.log(viewModel.Entity);
        let puedeAprobar = false;
        let indexUser;

        // if (this.GetCurrentStage().UserCanApprove(currentUser.ItemId)
        //     && viewModel.Entity.WorkflowStages[0].ApproverIDs[0]
        //     == currentUser.ItemId) {
        //     puedeAprobar = true;
        //     indexUser = -1;
        // }
        for (let i = 0; i < viewModel.Entity.WorkflowStages[0].ApproverIDs.length; i++) {
            if (viewModel.Entity.WorkflowStages[0].ApproverIDs[i] == currentUser.ItemId) {
                indexUser = i;
                viewModel.Entity.WorkflowStages[0].ApproverIDs.length -= 1;
            }
        }
        // }

        console.log(this.GetCurrentStage().UserCanApprove(29));
        console.log(this.GetCurrentStage().UserCanApprove(currentUser.ItemId));
        console.log(currentUser.ItemId);
        if (indexUser > 0) {
            if (!this.GetCurrentStage().UserCanApprove(viewModel.Entity.WorkflowStages[0].ApproverIDs[indexUser - 1])
                && this.GetCurrentStage().UserCanApprove(currentUser.ItemId))
                puedeAprobar = true;
        }
        else if (indexUser == 0 && this.GetCurrentStage().UserCanApprove(currentUser.ItemId))
            puedeAprobar = true;

        // }

        if (
            puedeAprobar &&
            viewModel.Entity.TipoFlujo != null) {
            viewModel.ShowApproveButton = true;
            viewModel.ShowRejectButton = true;
        }

        return viewModel;
    }

    public async Approve(comments: string): Promise<void> {
        const stage = this.GetCurrentStage();
        const user = await SecurityHelper.GetCurrentUser();
        const kam = await SecurityHelper.GetUserById(this.Entity.Client.KeyAccountManager.ItemId);

        stage.AddToCompletBy(user.ItemId);

        if (stage.IsComplete()) {
            if (this.Entity.CurrentStageNumber == this.Entity.WorkflowStages.length) {
                this.Entity.ChangeState(PromoStatus.Approved);

                const to = kam.Email;

                NotificacionsManager.SendWorkflowApprovedNotification(this.Entity, to);
            }
            else {
                this.Entity.CurrentStageNumber++;
                const users = await this.GetCurrentStage().GetPendingUsers();

                await Promise.all(users.map(async (usr) => {
                    await NotificacionsManager.SendTaskAssignedNotification(this.Entity, usr.Email, null, usr.Value);
                }));
            }
        }

        let readerIDs = [this.Entity.Client.KeyAccountManager.ItemId];

        for (let i = 0; i < this.Entity.CurrentStageNumber; i++)
            readerIDs = readerIDs.concat(this.Entity.WorkflowStages[i].CompletedBy);

        await SecurityHelper.SetPromoPermissions(this.Entity.ItemId, readerIDs, this.GetCurrentStage().GetPendingUserIDs());
        await PromoRepository.SaveOrUpdate(this.Entity, 1);
        await WorkflowLogRepository.Save(this.Entity.ItemId, this.Entity.PromoID, "Aprobar", comments, this.Entity);

        return NotificacionsManager.SendTaskApprovedNotification(this.Entity, user.Value, kam.Email);
    }

    public async Reject(comments: string): Promise<void> {
        const stage = this.GetCurrentStage();
        const user = await SecurityHelper.GetCurrentUser();

        this.Entity.ChangeState(PromoStatus.Rejected);

        stage.AddToCompletBy(user.ItemId);

        await PromoRepository.SaveOrUpdate(this.Entity, 1);
        await WorkflowLogRepository.Save(this.Entity.ItemId, this.Entity.PromoID, "Rechazar", comments, this.Entity);

        let readerIDs = [this.Entity.Client.KeyAccountManager.ItemId];

        for (let i = 0; i < this.Entity.CurrentStageNumber; i++)
            readerIDs = readerIDs.concat(this.Entity.WorkflowStages[i].CompletedBy);

        readerIDs = readerIDs.concat(stage.GetPendingUserIDs());

        await SecurityHelper.SetPromoPermissions(this.Entity.ItemId, readerIDs);

        const to = (await SecurityHelper.GetUserById(this.Entity.Client.KeyAccountManager.ItemId)).Email;

        return NotificacionsManager.SendTaskRejectedNotification(this.Entity, comments, user.Value, to);
    }

    public async FlowAsign(entity: Promo, comments: string, flowType: FlowType): Promise<void> {
        const stage = this.GetCurrentStage();
        const user = await SecurityHelper.GetCurrentUser();
        const kam = await SecurityHelper.GetUserById(entity.Client.KeyAccountManager.ItemId);

        await this.InitializeWorkflowState(entity);

        stage.AddToCompletBy(user.ItemId);

        if (stage.IsComplete()) {
            if (entity.CurrentStageNumber == entity.WorkflowStages.length) {
                const to = kam.Email;

                NotificacionsManager.SendWorkflowApprovedNotification(entity, to);
            }
            else {
                entity.CurrentStageNumber++;
                const users = await this.GetCurrentStage().GetPendingUsers();

                await Promise.all(users.map(async (usr) => {
                    await NotificacionsManager.SendTaskAssignedNotification(entity, usr.Email, null, usr.Value);
                }));
            }
        }

        let readerIDs = [entity.Client.KeyAccountManager.ItemId];

        for (let i = 0; i < entity.CurrentStageNumber; i++)
            readerIDs = readerIDs.concat(entity.WorkflowStages[i].CompletedBy);

        entity.TipoFlujo = flowType;
        let mensaje = "Asignado" + "-" + flowType.Name as string;
        await SecurityHelper.SetPromoPermissions(entity.ItemId, readerIDs, this.GetCurrentStage().GetPendingUserIDs());
        await PromoRepository.SaveOrUpdate(entity, 1);
        await WorkflowLogRepository.Save(entity.ItemId, entity.PromoID, mensaje, comments, entity);

        return NotificacionsManager.SendTaskApprovedNotification(entity, user.Value, kam.Email);
    }
}