import { Entity } from "../../infrastructure";
export declare class LastYearVolumes extends Entity {
    Volumes: number[];
    GetDailyVolume(year: number, month: number): number;
    GetAverageVolumeL3Months(referenceMonth: number): number;
}
//# sourceMappingURL=LastYearVolumes.d.ts.map