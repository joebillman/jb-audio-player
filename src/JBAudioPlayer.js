/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shape = createjs.Shape;
var Container = createjs.Container;
/**
 * Created by Joe on 4/11/2016.
 */
var JBAudioPlayer = (function (_super) {
    __extends(JBAudioPlayer, _super);
    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------
    function JBAudioPlayer() {
        _super.call(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------
    //----------------------------------
    //  Private:
    //----------------------------------
    JBAudioPlayer.prototype._init = function () {
        this.played = false;
    };
    JBAudioPlayer.prototype.createBg = function () {
        this.bg = new Shape();
        this.bg.graphics.beginFill("#FF0000");
        this.bg.graphics.drawRoundRect(0, 0, 400, 100, 6);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
    };
    //----------------------------------
    //  Public:
    //----------------------------------
    JBAudioPlayer.prototype.create = function () {
        this.createBg();
    };
    JBAudioPlayer.prototype.play = function () {
    };
    return JBAudioPlayer;
}(Container));
//# sourceMappingURL=JBAudioPlayer.js.map