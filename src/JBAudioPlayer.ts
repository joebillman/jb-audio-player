/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>

import Bitmap = createjs.Bitmap;
import Container = createjs.Container;
import CreateJSText = createjs.Text;
import Shape = createjs.Shape;

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
    public btnColor:string;
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

    private bg:Shape;
    private curTimeField:CreateJSText;
    private playBtn:Bitmap;
    private played:boolean;
    private progressBarBg:Shape;
    private progressBarFill:Shape;
    private subTitleField:CreateJSText;
    private titleField:CreateJSText;
    private totalTimeField:CreateJSText;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor()
    {
        super();

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

    private updateStage = () =>
    {
        console.log(this.playBtn.getBounds().width);
        this.playBtn.regX = this.playBtn.getBounds().width/2;
        this.playBtn.regY = this.playBtn.getBounds().height/2;
        this.playBtn.x = this.width/2;
        this.playBtn.y = 128;
        this.stage.update();
    }

    private createPlayBtn()
    {
        this.playBtn = new Bitmap("images/play-btn.png");
        this.addChild(this.playBtn);
        setTimeout(this.updateStage, 1000);
    }

    private createProgressBars()
    {
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
    }

    private createSubTitle()
    {
        this.subTitleField = new CreateJSText();
        this.subTitleField.color = this.textColor;
        this.subTitleField.font = "18px Arial";
        this.subTitleField.textAlign = "center";
        this.subTitleField.text = "Subtitle Goes Here";
        this.subTitleField.x = this.width/2;
        this.subTitleField.y = 37;
        this.addChild(this.subTitleField);
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
        this.titleField.text = "Title Goes Here";
        this.titleField.x = this.width/2;
        this.titleField.y = 8;
        this.addChild(this.titleField);
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    create()
    {
        this.createBg();
        this.createTitle();
        this.createSubTitle();
        this.createTimeFields();
        this.createProgressBars();
        this.createPlayBtn();
    }

    play()
    {
        
    }

}