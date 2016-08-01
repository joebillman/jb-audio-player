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
var Sound = createjs.Sound;
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
        this.handleClick = function () {
            console.log("click");
            console.log(_this.pauseBtn.visible);
            if (_this.playing) {
                clearInterval(_this.intervalID);
                _this.pauseBtn.visible = false;
                _this.playBtn.visible = true;
                _this.curPosition = _this.curAudio.position;
                _this.curAudio.stop();
            }
            else {
                _this.pauseBtn.visible = true;
                _this.playBtn.visible = false;
                _this.curAudio.play();
                _this.curAudio.position = _this.curPosition;
                _this.intervalID = setInterval(_this.handleInterval, 250);
            }
            _this.stage.update();
            _this.playing = !_this.playing;
        };
        this.handleAudioComplete = function () {
            clearInterval(_this.intervalID);
            //console.log("audioComplete");
        };
        this.handleInterval = function () {
            _this.updatePlayPosition();
            _this.updateProgressBarWidth(_this.curAudio.position / _this.curAudio.duration);
        };
        this.handleLoadAudio = function () {
            _this.updateTitle("Press Forward");
            _this.updateSubTitle("Noelle Bybee");
            _this.play();
        };
        this.bgFillColor = "#FFFFFF";
        this.bgStrokeColor = "#0079FF";
        this.btnFillColor = "#FFFFFF";
        this.btnStrokeColor = "#0079FF";
        this.btnSymbolColor = "#0079FF";
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
    JBAudioPlayer.prototype.createPauseBtn = function () {
        this.pauseBtn = new Container();
        var circle = new Shape();
        circle.graphics.beginStroke(this.btnStrokeColor);
        circle.graphics.setStrokeStyle(2);
        circle.graphics.beginFill(this.btnFillColor);
        circle.graphics.drawCircle(0, 0, 25);
        circle.graphics.endFill();
        this.pauseBtn.addChild(circle);
        var bar1 = new Shape();
        bar1.graphics.beginFill(this.btnSymbolColor);
        bar1.graphics.drawRect(-10, -10, 8, 20);
        bar1.graphics.endFill();
        this.pauseBtn.addChild(bar1);
        var bar2 = new Shape();
        bar2.graphics.beginFill(this.btnSymbolColor);
        bar2.graphics.drawRect(2, -10, 8, 20);
        bar2.graphics.endFill();
        this.pauseBtn.addChild(bar2);
        this.pauseBtn.setBounds(0, 0, 50, 50);
        this.pauseBtn.x = this.width / 2;
        this.pauseBtn.y = 128;
        this.pauseBtn.addEventListener("click", this.handleClick);
        this.addChild(this.pauseBtn);
    };
    JBAudioPlayer.prototype.createPlayBtn = function () {
        this.playBtn = new Container();
        var circle = new Shape();
        circle.graphics.beginStroke(this.btnStrokeColor);
        circle.graphics.setStrokeStyle(2);
        circle.graphics.beginFill(this.bgFillColor);
        circle.graphics.drawCircle(0, 0, 25);
        circle.graphics.endFill();
        this.playBtn.addChild(circle);
        var triangle = new Shape();
        triangle.graphics.beginFill(this.btnSymbolColor);
        triangle.graphics.drawPolyStar(0, 0, 16, 3, 0, 0);
        triangle.graphics.endFill();
        this.playBtn.addChild(triangle);
        this.playBtn.setBounds(0, 0, 50, 50);
        this.playBtn.x = this.width / 2;
        this.playBtn.y = 128;
        this.playBtn.addEventListener("click", this.handleClick);
        this.playBtn.visible = false;
        this.addChild(this.playBtn);
    };
    JBAudioPlayer.prototype.createProgressBar = function (width) {
        if (width === void 0) { width = 0; }
        this.progressBarFill = new Shape();
        this.progressBarFill.graphics.beginFill(this.progressBarFillColor);
        this.progressBarFill.graphics.drawRect(0, 0, width, 14);
        this.progressBarFill.graphics.endFill();
        this.progressBarFill.setBounds(0, 0, width, 14);
        this.progressBarFill.x = 60;
        this.progressBarFill.y = 68;
        this.addChild(this.progressBarFill);
    };
    JBAudioPlayer.prototype.createProgressBarBg = function () {
        this.progressBarBg = new Shape();
        this.progressBarBg.graphics.beginFill(this.progressBarBgColor);
        this.progressBarBg.graphics.drawRect(0, 0, 200, 14);
        this.progressBarBg.graphics.endFill();
        this.progressBarBg.setBounds(0, 0, 200, 14);
        this.progressBarBg.x = 60;
        this.progressBarBg.y = 68;
        this.addChild(this.progressBarBg);
    };
    JBAudioPlayer.prototype.createProgressBars = function () {
        this.createProgressBarBg();
        this.createProgressBar();
    };
    JBAudioPlayer.prototype.createSubTitle = function () {
        this.subTitleField = new CreateJSText();
        this.subTitleField.color = this.textColor;
        this.subTitleField.font = "18px Arial";
        this.subTitleField.textAlign = "center";
        this.subTitleField.text = "";
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
        this.titleField.text = "";
        this.titleField.x = this.width / 2;
        this.titleField.y = 8;
        this.addChild(this.titleField);
    };
    JBAudioPlayer.prototype.destroyProgressBar = function () {
        if (this.progressBarFill) {
            if (this.contains(this.progressBarFill)) {
                this.removeChild(this.progressBarFill);
            }
            this.progressBarFill = null;
        }
    };
    JBAudioPlayer.prototype.milliToMinAndSec = function (val) {
        var time_str = "";
        var min = Math.floor(val / 1000 / 60);
        var sec = (Math.floor(val / 1000) % 60);
        time_str += (min < 10) ? 0 + min.toString() : min.toString();
        time_str += ":";
        time_str += (sec < 10) ? 0 + sec.toString() : sec.toString();
        return time_str;
    };
    JBAudioPlayer.prototype.updatePlayPosition = function () {
        this.curTimeField.text = this.milliToMinAndSec(this.curAudio.position);
        this.stage.update();
    };
    JBAudioPlayer.prototype.updateProgressBarWidth = function (percentage) {
        this.destroyProgressBar();
        this.createProgressBar(200 * percentage);
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
        this.createPauseBtn();
    };
    JBAudioPlayer.prototype.loadAudioFile = function (file, id) {
        if (id === void 0) { id = "audio"; }
        Sound.on("fileload", this.handleLoadAudio, this);
        Sound.registerSound(file, id);
    };
    JBAudioPlayer.prototype.play = function (id) {
        if (id === void 0) { id = "audio"; }
        this.playing = true;
        this.curAudio = createjs.Sound.play(id);
        this.curAudio.on("complete", this.handleAudioComplete, this);
        this.curAudio.volume = 0;
        this.totalTimeField.text = this.milliToMinAndSec(this.curAudio.duration);
        this.intervalID = setInterval(this.handleInterval, 250);
    };
    JBAudioPlayer.prototype.updateSubTitle = function (sub) {
        this.subTitleField.text = sub;
    };
    JBAudioPlayer.prototype.updateTitle = function (title) {
        this.titleField.text = title;
    };
    return JBAudioPlayer;
}(Container));
//# sourceMappingURL=JBAudioPlayer.js.map