import { Constants } from "../../..";
import { ApproversRepository } from "../../../data/ApproversRepository";
import { LookupValue } from "../../../infrastructure";
import { Promo } from "../Promo";
import { PromoViewModel } from "../PromoViewModel";
import { PromoWorkflowState } from "../PromoWorkflowState";
import { FlowType } from "../../Common";

export abstract class PromoState {
    public Entity: Promo;

    public abstract GetStatusId(): number;
    public abstract GetStatusText(): string;
    public abstract GetViewModel(): Promise<PromoViewModel>;

    public async Initialize(): Promise<void> {
        return;
    }

    public async Save(entity: Promo): Promise<void> {
        throw new Error(Constants.Messages.NotAllowedAction);
    }

    public Submit(entity: Promo): Promise<void> {
        throw new Error(Constants.Messages.NotAllowedAction);
    }

    public async Approve(comments: string): Promise<void> {
        throw new Error(Constants.Messages.NotAllowedAction);
    }

    public Reject(comments: string): Promise<void> {
        return;
        //throw new Error(Constants.Messages.NotAllowedAction);
    }

    public async Proven(comments: string): Promise<void> {
        return;
        //throw new Error(Constants.Messages.NotAllowedAction);
    }

    public async FlowAsign(entity: Promo, comments: string, flowType: FlowType): Promise<void> {
        return;
    }

    public async InitializeWorkflowState(entity: Promo): Promise<void> {
        const approvers = await ApproversRepository.GetInstance();
        const kamUserId = entity.Client.Channel.HeadOfChannel.ItemId;
        const teamLeader = entity.Client.teamLeader;

        if (entity.TipoFlujo == undefined) {
            entity.WorkflowStages = [new PromoWorkflowState([
                approvers.Phase0Coordinator1.ItemId,
                approvers.Phase0Coordinator2.ItemId,
                approvers.Phase0Coordinator3.ItemId])];
        }
        else {
            if (entity.TipoFlujo.ItemId == 1) {
                entity.WorkflowStages = [new PromoWorkflowState([
                    approvers.Phase1Approver1.ItemId])];
            }
            else if (entity.TipoFlujo.ItemId == 2) {
                entity.WorkflowStages = [new PromoWorkflowState([
                    teamLeader.ItemId,
                    kamUserId,
                    approvers.Phase2Approver1.ItemId])];
            }
            else if (entity.TipoFlujo.ItemId == 3) {
                entity.WorkflowStages = [new PromoWorkflowState([
                    teamLeader.ItemId,
                    kamUserId,
                    approvers.Phase2Approver1.ItemId,
                    approvers.Phase3Approver1.ItemId,
                    approvers.Phase3Approver2.ItemId])];
            }
        }

        // if (kamUserId != approverUserId)
        //     entity.WorkflowStages = [new PromoWorkflowState([kamUserId, approverUserId])];
        // else
        //     entity.WorkflowStages = [new PromoWorkflowState([kamUserId])];

        // if (entity.GetTotalEstimatedInvestment() > entity.Config.ApprovalAmountLimit) {
        //     const approver1 = approvers.Phase2Approver1.ItemId;
        //     const approver2 = approvers.Phase3Approver1.ItemId;

        //     if (approver1 != approver2)
        //         entity.WorkflowStages.push(new PromoWorkflowState([approver1, approver2]));
        //     else
        //         entity.WorkflowStages.push(new PromoWorkflowState([approver1]));
        // }

        entity.CurrentStageNumber = 1;
    }

    public GetCurrentStage(): PromoWorkflowState {
        return this.Entity.CurrentStageNumber > 0 ? this.Entity.WorkflowStages[this.Entity.CurrentStageNumber - 1] : null;
    }
}