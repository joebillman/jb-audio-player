/// <reference path="../libraries/createjs/createjs.d.ts"/>
/// <reference path="ICreateable.ts"/>

import Shape = createjs.Shape;
import Container = createjs.Container;
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
    //  Private:
    //----------------------------------

    private bg:Shape;
    private played:boolean;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor()
    {
        super();
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private _init()
    {
        this.played = false;
    }

    private createBg()
    {
        this.bg = new Shape();
        this.bg.graphics.beginFill("#FF0000");
        this.bg.graphics.drawRoundRect(0, 0, 400, 100, 6);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    create()
    {
        this.createBg();
    }

    play()
    {
        
    }

}