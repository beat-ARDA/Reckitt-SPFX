export var Constants;
(function (Constants) {
    var StatusTexts = /** @class */ (function () {
        function StatusTexts() {
        }
        StatusTexts.NewPromo = "Nueva promoción";
        StatusTexts.DraftPromo = "Borrador";
        StatusTexts.Approval = "Aprobación";
        StatusTexts.Approved = "Aprobada";
        StatusTexts.Rejected = "Rechazada";
        StatusTexts.Proven = "Comprobada";
        return StatusTexts;
    }());
    Constants.StatusTexts = StatusTexts;
    var Messages = /** @class */ (function () {
        function Messages() {
        }
        Messages.NotAllowedAction = "Esta acción no está permitida debido al estado actual de la promoción";
        Messages.RequiredField = "Este campo es requerido.";
        return Messages;
    }());
    Constants.Messages = Messages;
    var Groups = /** @class */ (function () {
        function Groups() {
        }
        Groups.ReadOnlyBaseGroupName = "RB - Solo consulta";
        Groups.KAMsBaseGroupName = "RB - KAMs";
        return Groups;
    }());
    Constants.Groups = Groups;
    var Miscellaneous = /** @class */ (function () {
        function Miscellaneous() {
        }
        Miscellaneous.DayPickerStrings = {
            months: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            goToToday: 'Ir a hoy',
            prevMonthAriaLabel: 'Ir al mes anterior',
            nextMonthAriaLabel: 'Ir al mes siguiente',
            prevYearAriaLabel: 'Ir al año anterior',
            nextYearAriaLabel: 'Ir al año siguiente',
            closeButtonAriaLabel: 'Cerrar',
            isRequiredErrorMessage: 'Este campo es requerido.',
            invalidInputErrorMessage: 'Formato de fecha inválido.'
        };
        Miscellaneous.ClearSelectionText = "--- Borrar selección ---";
        return Miscellaneous;
    }());
    Constants.Miscellaneous = Miscellaneous;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map