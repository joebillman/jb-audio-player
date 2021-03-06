/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    function JBAudioPlayer(width, height) {
        if (width === void 0) { width = 320; }
        if (height === void 0) { height = 180; }
        var _this = _super.call(this) || this;
        _this.handleClick = function () {
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
        _this.handleAudioComplete = function () {
            clearInterval(_this.intervalID);
            //console.log("audioComplete");
        };
        _this.handleInterval = function () {
            _this.updatePlayPosition();
            _this.updateProgressBarWidth(_this.curAudio.position / _this.curAudio.duration);
        };
        _this.handleLoadAudio = function () {
            _this.audioLoaded = true;
            _this.updateTitle(_this.curTitle);
            _this.updateSubtitle(_this.curSubtitle);
            _this.play();
        };
        _this.bgFillColor = "#FFFFFF";
        _this.bgStrokeColor = "#0079FF";
        _this.btnFillColor = "#FFFFFF";
        _this.btnStrokeColor = "#0079FF";
        _this.btnSymbolColor = "#0079FF";
        _this.played = false;
        _this.progressBarBgColor = "#CCCCCC";
        _this.progressBarFillColor = "#0079FF";
        _this.textColor = "#0079FF";
        _this.timeFontColor = "#000000";
        _this.width = width;
        _this.height = height;
        _this.cornerRadius = 6;
        return _this;
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
    JBAudioPlayer.prototype.createSubtitle = function () {
        this.subtitleField = new CreateJSText();
        this.subtitleField.color = this.textColor;
        this.subtitleField.font = "18px Arial";
        this.subtitleField.textAlign = "center";
        this.subtitleField.text = "";
        this.subtitleField.x = this.width / 2;
        this.subtitleField.y = 37;
        this.addChild(this.subtitleField);
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
        this.createSubtitle();
        this.createTimeFields();
        this.createProgressBars();
        this.createPlayBtn();
        this.createPauseBtn();
        this.stage.update();
    };
    JBAudioPlayer.prototype.loadAudioFile = function (file, title, subtitle, id) {
        if (title === void 0) { title = ""; }
        if (subtitle === void 0) { subtitle = ""; }
        if (id === void 0) { id = "audio"; }
        this.audioLoaded = false;
        if (this.playing) {
            createjs.Sound.stop();
            this.playing = false;
            this.curTimeField.text = "00:00";
            this.totalTimeField.text = "00:00";
        }
        Sound.on("fileload", this.handleLoadAudio, this);
        Sound.registerSound(file, id);
        this.curTitle = title;
        this.curSubtitle = subtitle;
        this.updateTitle("");
        this.updateSubtitle("Loading...");
    };
    JBAudioPlayer.prototype.play = function (id) {
        if (id === void 0) { id = "audio"; }
        this.playing = true;
        this.curAudio = createjs.Sound.play(id);
        this.curAudio.on("complete", this.handleAudioComplete, this);
        //this.curAudio.volume = 0;
        this.totalTimeField.text = this.milliToMinAndSec(this.curAudio.duration);
        this.intervalID = setInterval(this.handleInterval, 250);
    };
    JBAudioPlayer.prototype.updateSubtitle = function (subtitle) {
        this.subtitleField.text = subtitle;
        this.stage.update();
    };
    JBAudioPlayer.prototype.updateTitle = function (title) {
        this.titleField.text = title;
        this.stage.update();
    };
    return JBAudioPlayer;
}(Container));
