/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>

import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import CreateJSText = createjs.Text;
import Shape = createjs.Shape;
import Sound = createjs.Sound;

/**
 * Created by Joe on 4/11/2016.
 */

class JBAudioPlayer extends Container implements ICreateable
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Public:
    //----------------------------------

    public bgFillColor:string;
    public bgStrokeColor:string;
    public btnFillColor:string;
    public btnStrokeColor:string;
    public btnSymbolColor:string;
    public cornerRadius:number;
    public height:number;
    public progressBarBgColor:string;
    public progressBarFillColor:string;
    public textColor:string;
    public timeFontColor:string;
    public width:number;

    //----------------------------------
    //  Private:
    //----------------------------------

    private audioLoaded:boolean;
    private bg:Shape;
    private curAudio;
    private curPosition:number;
    private curSubtitle:string;
    private curTimeField:CreateJSText;
    private curTitle:string;
    private intervalID:number;
    private pauseBtn:Container;
    private playBtn:Container;
    private played:boolean;
    private playing:boolean;
    private progressBarBg:Shape;
    private progressBarFill:Shape;
    private subtitleField:CreateJSText;
    private titleField:CreateJSText;
    private totalTimeField:CreateJSText;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(width:number=320, height=180)
    {
        super();

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
        this.width = width;
        this.height = height;
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

    private createBg()
    {
        this.bg = new Shape();
        this.bg.graphics.setStrokeStyle(2);
        this.bg.graphics.beginStroke(this.bgStrokeColor);
        this.bg.graphics.beginFill(this.bgFillColor);
        this.bg.graphics.drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
        this.bg.graphics.endFill();
        this.bg.setBounds(0, 0, this.width, this.height);
        this.addChild(this.bg);
    }

    private createPauseBtn()
    {
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
        this.pauseBtn.x = this.width/2;
        this.pauseBtn.y = 128;
        this.pauseBtn.addEventListener("click", this.handleClick);
        this.addChild(this.pauseBtn);
    }

    private createPlayBtn()
    {
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
        this.playBtn.x = this.width/2;
        this.playBtn.y = 128;
        this.playBtn.addEventListener("click", this.handleClick);
        this.playBtn.visible = false;
        this.addChild(this.playBtn);
    }

    private createProgressBar(width:number = 0)
    {
        this.progressBarFill = new Shape();
        this.progressBarFill.graphics.beginFill(this.progressBarFillColor);
        this.progressBarFill.graphics.drawRect(0, 0, width, 14);
        this.progressBarFill.graphics.endFill();
        this.progressBarFill.setBounds(0, 0, width, 14);
        this.progressBarFill.x = 60;
        this.progressBarFill.y = 68;
        this.addChild(this.progressBarFill);
    }

    private createProgressBarBg()
    {
        this.progressBarBg = new Shape();
        this.progressBarBg.graphics.beginFill(this.progressBarBgColor);
        this.progressBarBg.graphics.drawRect(0, 0, 200, 14);
        this.progressBarBg.graphics.endFill();
        this.progressBarBg.setBounds(0, 0, 200, 14);
        this.progressBarBg.x = 60;
        this.progressBarBg.y = 68;
        this.addChild(this.progressBarBg);
    }

    private createProgressBars()
    {
        this.createProgressBarBg();
        this.createProgressBar();
    }

    private createSubtitle()
    {
        this.subtitleField = new CreateJSText();
        this.subtitleField.color = this.textColor;
        this.subtitleField.font = "18px Arial";
        this.subtitleField.textAlign = "center";
        this.subtitleField.text = "";
        this.subtitleField.x = this.width/2;
        this.subtitleField.y = 37;
        this.addChild(this.subtitleField);
    }

    private createTimeFields()
    {
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
    }

    private createTitle()
    {
        this.titleField = new CreateJSText();
        this.titleField.color = this.textColor;
        this.titleField.font = "bold 22px Arial";
        this.titleField.textAlign = "center";
        this.titleField.text = "";
        this.titleField.x = this.width/2;
        this.titleField.y = 8;
        this.addChild(this.titleField);
    }

    private destroyProgressBar()
    {
        if(this.progressBarFill)
        {
            if(this.contains(this.progressBarFill))
            {
                this.removeChild(this.progressBarFill);
            }
            this.progressBarFill = null;
        }
    }

    private handleClick = () =>
    {
        console.log("click");
        console.log(this.pauseBtn.visible);
        if(this.playing)
        {
            clearInterval(this.intervalID);
            this.pauseBtn.visible = false;
            this.playBtn.visible = true;
            this.curPosition = this.curAudio.position;
            this.curAudio.stop();
        }
        else
        {
            this.pauseBtn.visible = true;
            this.playBtn.visible = false;
            this.curAudio.play();
            this.curAudio.position = this.curPosition;
            this.intervalID = setInterval(this.handleInterval, 250);
        }
        this.stage.update();
        this.playing = !this.playing;
    }

    private handleAudioComplete = () =>
    {
        clearInterval(this.intervalID);
        //console.log("audioComplete");
    }

    private handleInterval = () =>
    {
        this.updatePlayPosition();
        this.updateProgressBarWidth(this.curAudio.position/this.curAudio.duration);
    }

    private handleLoadAudio = () =>
    {
        this.audioLoaded = true;
        this.updateTitle(this.curTitle);
        this.updateSubtitle(this.curSubtitle);
        this.play();
    }

    private milliToMinAndSec(val:number):string
    {
        var time_str:string = "";
        var min:number = Math.floor(val / 1000 / 60);
        var sec:number = (Math.floor(val / 1000) % 60);
        time_str += (min < 10)? 0+min.toString():min.toString();
        time_str += ":";
        time_str += (sec < 10)?0+sec.toString():sec.toString();

        return time_str;
    }

    private updatePlayPosition()
    {
        this.curTimeField.text = this.milliToMinAndSec(this.curAudio.position);
        this.stage.update();
    }

    private updateProgressBarWidth(percentage:number)
    {
        this.destroyProgressBar();
        this.createProgressBar(200*percentage);
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    public create()
    {
        this.createBg();
        this.createTitle();
        this.createSubtitle();
        this.createTimeFields();
        this.createProgressBars();
        this.createPlayBtn();
        this.createPauseBtn();
        this.stage.update();
    }

    public loadAudioFile(file:string, title:string="", subtitle="", id:string="audio")
    {
        this.audioLoaded = false;
        if(this.playing)
        {
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
    }

    public play(id:string="audio")
    {
        this.playing = true;
        this.curAudio = createjs.Sound.play(id);
        this.curAudio.on("complete", this.handleAudioComplete, this);
        //this.curAudio.volume = 0;
        this.totalTimeField.text = this.milliToMinAndSec(this.curAudio.duration);
        this.intervalID = setInterval(this.handleInterval, 250);
    }

    public updateSubtitle(subtitle:string)
    {
        this.subtitleField.text = subtitle;
        this.stage.update();
    }

    public updateTitle(title:string)
    {
        this.titleField.text = title;
        this.stage.update();
    }

}