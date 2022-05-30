var PromoViewModel = /** @class */ (function () {
    function PromoViewModel(entity) {
        this.Entity = entity;
        this.ReadOnlyForm = false;
    }
    //#endregion
    PromoViewModel.prototype.GetPromotionTitle = function () {
        if (this.Entity != null && this.Entity.Name && this.Entity.Client != null)
            return this.Entity.Client.Name + " - " + this.Entity.Name;
        return "Nueva promoción";
    };
    return PromoViewModel;
}());
export { PromoViewModel };
//# sourceMappingURL=PromoViewModel.js.map