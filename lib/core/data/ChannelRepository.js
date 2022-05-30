import { sp } from "@pnp/sp/presets/all";
import { Channel } from "../model/Common/Channel";
var ChannelRepository = /** @class */ (function () {
    function ChannelRepository() {
    }
    ChannelRepository.GetById = function (id) {
        var entity = sp.web.lists.getByTitle(ChannelRepository.LIST_NAME)
            .items.getById(id).select("ID", "Title", "HeadOfChannel/ID", "HeadOfChannel/Title").expand("HeadOfChannel").get().then(function (item) {
            return ChannelRepository.BuildEntity(item);
        });
        return entity;
    };
    ChannelRepository.BuildEntity = function (item) {
        var entity = new Channel();
        entity.ItemId = item.ID;
        entity.Name = item.Title;
        entity.HeadOfChannel = item.HeadOfChannel ? { ItemId: item.HeadOfChannel.ID, Value: item.HeadOfChannel.Title } : null;
        return entity;
    };
    ChannelRepository.LIST_NAME = "Canales";
    return ChannelRepository;
}());
export { ChannelRepository };
//# sourceMappingURL=ChannelRepository.js.map