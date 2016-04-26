/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bitmap = createjs.Bitmap;
var Container = createjs.Container;
var CreateJSText = createjs.Text;
var Shape = createjs.Shape;
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
        var _this = this;
        _super.call(this);
        this.updateStage = function () {
            console.log(_this.playBtn.getBounds().width);
            _this.playBtn.regX = _this.playBtn.getBounds().width / 2;
            _this.playBtn.regY = _this.playBtn.getBounds().height / 2;
            _this.playBtn.x = _this.width / 2;
            _this.playBtn.y = 128;
            _this.stage.update();
        };
        this.bgFillColor = "#FFFFFF";
        this.bgStrokeColor = "#0079FF";
        this.btnColor = "FF0000";
        this.played = false;
        this.progressBarBgColor = "#CCCCCC";
        this.progressBarFillColor = "#0079FF";
        this.textColor = "#0079FF";
        this.timeFontColor = "#000000";
        this.width = 320;
        this.height = 180;
        this.cornerRadius = 6;
    }
    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------
    //----------------------------------
    //  Private:
    //----------------------------------
    JBAudioPlayer.prototype.createBg = function () {
        this.bg = new Shape();
        this.bg.graphics.setStrokeStyle(2);
        this.bg.graphics.beginStroke(this.bgStrokeColor);
        this.bg.graphics.beginFill(this.bgFillColor);
        this.bg.graphics.drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
        this.bg.graphics.endFill();
        this.bg.setBounds(0, 0, this.width, this.height);
        this.addChild(this.bg);
    };
    JBAudioPlayer.prototype.createPlayBtn = function () {
        this.playBtn = new Bitmap("images/play-btn.png");
        this.addChild(this.playBtn);
        setTimeout(this.updateStage, 1000);
    };
    JBAudioPlayer.prototype.createProgressBars = function () {
        this.progressBarBg = new Shape();
        this.progressBarBg.graphics.beginFill(this.progressBarBgColor);
        this.progressBarBg.graphics.drawRect(0, 0, 200, 14);
        this.progressBarBg.graphics.endFill();
        this.progressBarBg.setBounds(0, 0, 200, 14);
        this.progressBarBg.x = 60;
        this.progressBarBg.y = 68;
        this.addChild(this.progressBarBg);
        this.progressBarFill = new Shape();
        this.progressBarFill.graphics.beginFill(this.progressBarFillColor);
        this.progressBarFill.graphics.drawRect(0, 0, 180, 14);
        this.progressBarFill.graphics.endFill();
        this.progressBarFill.setBounds(0, 0, 180, 14);
        this.progressBarFill.x = 60;
        this.progressBarFill.y = 68;
        this.addChild(this.progressBarFill);
    };
    JBAudioPlayer.prototype.createSubTitle = function () {
        this.subTitleField = new CreateJSText();
        this.subTitleField.color = this.textColor;
        this.subTitleField.font = "18px Arial";
        this.subTitleField.textAlign = "center";
        this.subTitleField.text = "Subtitle Goes Here";
        this.subTitleField.x = this.width / 2;
        this.subTitleField.y = 37;
        this.addChild(this.subTitleField);
    };
    JBAudioPlayer.prototype.createTimeFields = function () {
        this.curTimeField = new CreateJSText();
        this.curTimeField.color = this.textColor;
        this.curTimeField.font = "15px Arial";
        this.curTimeField.text = "00:00";
        this.curTimeField.x = 12;
        this.curTimeField.y = 66;
        this.addChild(this.curTimeField);
        this.totalTimeField = new CreateJSText();
        this.totalTimeField.color = this.textColor;
        this.totalTimeField.font = "15px Arial";
        this.totalTimeField.text = "00:00";
        this.totalTimeField.x = 269;
        this.totalTimeField.y = 66;
        this.addChild(this.totalTimeField);
    };
    JBAudioPlayer.prototype.createTitle = function () {
        this.titleField = new CreateJSText();
        this.titleField.color = this.textColor;
        this.titleField.font = "bold 22px Arial";
        this.titleField.textAlign = "center";
        this.titleField.text = "Title Goes Here";
        this.titleField.x = this.width / 2;
        this.titleField.y = 8;
        this.addChild(this.titleField);
    };
    //----------------------------------
    //  Public:
    //----------------------------------
    JBAudioPlayer.prototype.create = function () {
        this.createBg();
        this.createTitle();
        this.createSubTitle();
        this.createTimeFields();
        this.createProgressBars();
        this.createPlayBtn();
    };
    JBAudioPlayer.prototype.play = function () {
    };
    return JBAudioPlayer;
}(Container));
//# sourceMappingURL=JBAudioPlayer.js.map