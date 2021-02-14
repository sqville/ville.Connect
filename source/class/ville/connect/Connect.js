/* ************************************************************************

   Copyright: sqville 2021

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 *
 * @asset(ville/connect/*)
 */
qx.Class.define("ville.connect.Connect",
{
  extend : qx.core.Object,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * 
   */
  construct : function(connfile)
  {

    this.base(arguments);
    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _idgenerator : 0,

    _posA : null,

    _posB : null,

    _wline1 : null,

    _wline2 : null,

    _wline3 : null,

    _wendarrow : null,

     /**
     * Draws a connection between two elements.
     *
     * @param {object} elementA A Qooxdoo Window object for the first element.
     * @param {object} elementB A Qooxdoo Window object for the second element.
     * @param {object} options An associative array with the properties 'color' (which defines the color of the connection), 'radius' (the width of the
     * connection), 'roundedCorners' (a boolean indicating if the corners must be round), 'anchorA' (the anchor type of the first element, which can be 
     * 'horizontal' or 'vertical') and 'anchorB' (the anchor type of second element).
     * @returns {string} The connection identifier or 'null' if the connection could not be draw.
     */
    connect: function (elementA, elementB, properties, options, appobj) {
        // Verify if the element's selector are ok.
        if(elementA == null || elementB == null || appobj == null) {
          return null;
        }

        //var connection = this._createConnectionObject(elementA, elementB, options);
        var connection = this._createConnectionObject(elementA, elementB, properties, options);
        
        // Create line Widgets and add them to the Root
        //var wline1 = this._wline1 = new qx.ui.window.Window().set({backgroundColor: options.color});
        var wline1 = this._wline1 = new qx.ui.window.Window().set(properties);
        //wline1.setAnonymous(true);
        wline1.getChildControl("captionbar").setVisibility("hidden");
        wline1.setUserData("shapetype", "connectline");
        wline1.setUserData("connectid", connection.id);
        wline1.setUserData("segmentid", 1);
        wline1.setUserData("elementAhashcode", elementA.toHashCode());
        wline1.setUserData("elementBhashcode", elementB.toHashCode());
        wline1.setUserData("elementA", elementA);
        wline1.setUserData("elementB", elementB);
        wline1.setUserData("options", options);
        //var wline2 = this._wline2 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        var wline2 = this._wline2 = new qx.ui.window.Window().set(properties);
        //wline2.setAnonymous(true);
        wline2.getChildControl("captionbar").setVisibility("hidden");
        wline2.setUserData("shapetype", "connectline");
        wline2.setUserData("connectid", connection.id);
        wline2.setUserData("segmentid", 2);
        wline2.setUserData("elementAhashcode", elementA.toHashCode());
        wline2.setUserData("elementBhashcode", elementB.toHashCode());
        wline2.setUserData("elementA", elementA);
        wline2.setUserData("elementB", elementB);
        wline2.setUserData("options", options);
        //var wline3 = this._wline3 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        var wline3 = this._wline3 = new qx.ui.window.Window().set(properties);
       // wline3.setAnonymous(true);
        wline3.getChildControl("captionbar").setVisibility("hidden");
        wline3.setUserData("shapetype", "connectline");
        wline3.setUserData("connectid", connection.id);
        wline3.setUserData("segmentid", 3);
        wline3.setUserData("elementAhashcode", elementA.toHashCode());
        wline3.setUserData("elementBhashcode", elementB.toHashCode());
        wline3.setUserData("elementA", elementA);
        wline3.setUserData("elementB", elementB);
        wline3.setUserData("options", options);

        wline1.setUserData("wline2", wline2);
        wline1.setUserData("wline3", wline3);
        wline2.setUserData("wline1", wline1);
        wline2.setUserData("wline3", wline3);
        wline3.setUserData("wline1", wline1);
        wline3.setUserData("wline2", wline2);

        var menu = new qx.ui.menu.Menu;

        var hh = new qx.ui.menu.RadioButton("horizontal-horizontal");
        var hhimg = new qx.ui.basic.Image("ville/connect/horizontal-horizontal-16.png").set({anonymous : true, marginLeft : 3});
        hh._add(hhimg, {column:2});
        var hv = new qx.ui.menu.RadioButton("horizontal-vertical");
        var hvimg = new qx.ui.basic.Image("ville/connect/horizontal-vertical-16.png").set({anonymous : true, marginLeft : 3});
        hv._add(hvimg, {column:2});
        var vh = new qx.ui.menu.RadioButton("vertical-horizontal");
        var vhimg = new qx.ui.basic.Image("ville/connect/vertical-horizontal-16.png").set({anonymous : true, marginLeft : 3});
        vh._add(vhimg, {column:2});
        var vv = new qx.ui.menu.RadioButton("vertical-vertical");
        var vvimg = new qx.ui.basic.Image("ville/connect/vertical-vertical-16.png").set({anonymous : true, marginLeft : 3});
        vv._add(vvimg, {column:2});
        var extendconn = new qx.ui.menu.Button("Extend connector");

        menu.add(hh);
        menu.add(hv);
        menu.add(vh);
        menu.add(vv);
        menu.addSeparator();
        menu.add(extendconn);

        menu.setSpacingX(15);
        
        wline1.setContextMenu(menu);
        wline2.setContextMenu(menu);
        wline3.setContextMenu(menu);

        var conntype = options.anchorA + "-" + options.anchorB;
        switch (conntype) {
          case "horizontal-horizontal" :
            hh.setValue(true);
            //hh.setFont("bold");
            break;
          case "horizontal-vertical" :
            hv.setValue(true);
            break;
          case "vertical-horizontal" :
            vh.setValue(true);
            break;
          case "vertical-vertical" :
             vv.setValue(true);
        }

        // Configure and fill radio group
        var conntypegroup = new qx.ui.form.RadioGroup();
        conntypegroup.add(hh, hv, vh, vv);

        conntypegroup.addListener("changeSelection", function (e){
          var wline = e.getData()[0].getLayoutParent().getOpener();
          var arroptions = e.getData()[0].getLabel().split("-");
          var newoptions = {
            anchorA: arroptions[0], 
            anchorB : arroptions[1]
          }
          wline.setUserData("options", newoptions);
          //console.log(wline.getUserData("wline1").getUserData("segmentid"));
          var arrlines = [wline.getUserData("wline1"), wline.getUserData("wline2"), wline];
          this.repositionConnections(arrlines);
        }, this);

        appobj.add(wline1);
        appobj.add(wline2);
        appobj.add(wline3); 

        if (options != null && options.endShape != null && options.endShape != "none") {
            // Create line end shape and add it to the diagram
            //var wendarrow = this._wendarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow).set({backgroundColor: options.color, anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
            var wendarrow = this._wendarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow).set({backgroundColor: properties.backgroundColor, anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
            wendarrow.setUserData("shapetype", "connectline-endarrow");
            wendarrow.setUserData("connectid", connection.id);
            wendarrow.setUserData("elementB", elementB);
            wendarrow.setAutoHide(false);
            wendarrow.placeToWidget(elementB, true);
            wendarrow.show();
        }
        

        // Position connection.
        this._positionConnection(connection);

        // Position end point
        //this._positionEndPoint();

        elementA.setAlwaysOnTop(true);
        elementB.setAlwaysOnTop(true);
        
        wline1.maximize();
        wline2.maximize();
        wline3.maximize();

        //direction arrow test
        /*var directionarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow).set({backgroundColor: properties.backgroundColor, anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
        directionarrow.setDecorator("dark-arrow-right");
        //this._wendarrow.setOffsetLeft(-3);
        directionarrow.setPosition("left-middle");
        directionarrow.setAutoHide(false);
        directionarrow.placeToWidget(wline1, true);
        directionarrow.show();*/

        //wline1.setBackgroundColor("red");
        //wline2.setBackgroundColor("blue");
        //wline3.setBackgroundColor("green");

        //var arrowimage = new qx.ui.basic.Image("ville/connect/arrow_right.svg");
        //wline3.getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
        //wline3.getChildControl("pane").getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
        //arrowimage.getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
        //wline3.setLayout(new qx.ui.layout.VBox());
        //wline3.add(arrowimage);

        // Return result.
        return connection.id;
    },

    /**
 * Positions a connection, acording to the position of the elements which connects.
 * 
 * @param {object} connection A connection object.
 */
_positionConnection : function(connection) 
{
  //console.log(connection.elementB.getBounds());
  
  // Calculate the positions of the element's center. 
  //*** REMOVE LATER the 30 offset for the window captionbar height (+30) ****

  var posA = this._posA = connection.elementA.getBounds();
  var pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  var pAtop = parseInt(posA.top, 10) + parseInt((posA.height+30)/2, 10);

  var posB = this._posB = connection.elementB.getBounds();
  var pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
  var pBtop = parseInt(posB.top, 10) + parseInt((posB.height+30)/2, 10);

  // Verify if the elements are aligned in a horizontal or vertical line.
  if(pAleft == pBleft || pAtop == pBtop) {
    // Verify if the line must be vertical or horizonal.;
    if(pAleft == pBleft) {
        // VERTICAL LINE
        this._positionVerticalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);

        //direction arrow (UP or DOWN)
        if (connection.options.direction) {
          var direction = connection.options.direction;
          var directionarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow()).set({anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
          if (pAtop < pBtop && direction == "AtoB")
            directionarrow.setDecorator("dark-arrow-down");
          else if (pAtop < pBtop && direction == "BtoA")
            directionarrow.setDecorator("dark-arrow-up");
          else if (pAtop > pBtop && direction == "AtoB")
            directionarrow.setDecorator("dark-arrow-up");
          else if (pAtop > pBtop && direction == "BtoA")
            directionarrow.setDecorator("dark-arrow-down");
        
          // if direction = "both" then UPDOWN ARROW
          // else if pAtop < pBtop and direction = "AtoB" then DOWN ARROW (left-middle with offset)
          // else if pAtop > pBtop and direction = "AtoB" then UP ARROW
          // else if pAtop < pBtop and direction = "BtoA" then UP ARROW
          // else if pAtop > pBtop and direction = "BtoA" then DOWN ARROW
          directionarrow.setOffsetLeft(-12);
          directionarrow.setPosition("right-middle");
          directionarrow.setAutoHide(false);
          directionarrow.placeToWidget(this._wline1, true);
          directionarrow.show();
        }
        
      } else {
        // HORIZONTAL LINE
        // Draw the line
        this._positionHorizontalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);

        //direction arrow (LEFT or RIGHT)
        if (connection.options.direction) {
          var direction = connection.options.direction;
          var directionarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow()).set({anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
          if (pAleft < pBleft && direction == "AtoB")
            directionarrow.setDecorator("dark-arrow-right");
          else if (pAleft < pBleft && direction == "BtoA")
            directionarrow.setDecorator("dark-arrow-left");
          else if (pAleft > pBleft && direction == "AtoB")
            directionarrow.setDecorator("dark-arrow-left");
          else if (pAleft > pBleft && direction == "BtoA")
            directionarrow.setDecorator("dark-arrow-right");

          directionarrow.resetOffset();
          directionarrow.setOffsetTop(-12);
          directionarrow.setPosition("bottom-center");
          directionarrow.setAutoHide(false);
          directionarrow.placeToWidget(this._wline1, true);
          directionarrow.show();
        }
      }
      this._wline2.setUserBounds(pBleft, pBtop, 2, 2);
      this._wline3.setUserBounds(pBleft, pBtop, 2, 2);
    } else {
    // Verify if must use two lines or three.
    if(connection.anchorA != connection.anchorB) {
      // Check the anchors of the elements.
      var corner = new Object();
      if(connection.anchorA == 'vertical') {
        // Find the corner's position.
        corner.left = pAleft;
        corner.top = pBtop;
          
        // Draw lines.
        this._positionVerticalLine(this._wline1, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        this._positionHorizontalLine(this._wline2, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        
      } else {
        // Find the corner's position.
        corner.left = pBleft;
        corner.top = pAtop;
        
        // Draw lines.
        this._positionVerticalLine(this._wline1, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        this._positionHorizontalLine(this._wline2, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
      }
      this._wline3.setUserBounds(pBleft, pBtop, 2, 2);
      } else {          
          // Declare connection points.
          var corner1 = new Object();
          var corner2 = new Object();
          
          // Find if the middle's line must be vertical o horizontal.
          if(connection.anchorA == 'vertical') {
              // Middle's line must be horizontal.
              corner1.top = parseInt((pAtop + pBtop)/2, 10);
              corner2.top = corner1.top;
              corner1.left = pAleft;
              corner2.left = pBleft;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, pAleft, pAtop, corner1.left, corner1.top, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline2, pBleft, pBtop, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline3, corner1.left, corner1.top, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
          } else {
              // Middle's line must be vertical.
              corner1.left = parseInt((pAleft + pBleft)/2, 10);
              corner2.left = corner1.left;
              corner1.top = pAtop;
              corner2.top = pBtop;
              
              // Draw lines.
              this._positionHorizontalLine(this._wline1, pAleft, pAtop, corner1.left, corner1.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, pBleft, pBtop, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline3, corner1.left, corner1.top, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
          }
      }
  }

},

    /**
     * Draws a vertical line, between the two points, by changing the properties of a HTML element.
     *
     *@param {object} qxElement A Qooxdoo Window object used to represent the line.
    *@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
    *@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
    *@param {integer} radius The line's radius.
    *@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
    */
    _positionVerticalLine : function(qxElement, point1left, point1top, point2left, point2top, radius, roundedCorners)
    {
      var halfRadius = parseInt(radius/2, 10);
      qxElement.setUserBounds(point1left - halfRadius, ((point1top > point2top)? (point2top - halfRadius) : (point1top - halfRadius) ), radius, ((point1top > point2top)? (point1top - point2top + radius) : (point2top - point1top + radius) ));
    },

    /**
    * Draws a horizontal line, between the two points, by changing the properties of a HTML element.
    *
    *@param {object} qxElement A Qooxdoo Window object used to represent the line.
    *@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
    *@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
    *@param {integer} radius The line's radius.
    *@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
    * setUserBounds(Integer left, Integer top, Integer width, Integer height)
    */
    _positionHorizontalLine : function(qxElement, point1left, point1top, point2left, point2top, radius, roundedCorners) 
    {
      var halfRadius = parseInt(radius/2, 10);
      qxElement.setUserBounds(((point1left > point2left)? (point2left - halfRadius) : (point1left - halfRadius) ), point1top - halfRadius, ((point1left > point2left)? (point1left - point2left + radius) : (point2left - point1left + radius) ), radius);
    },

    _positionEndPoint : function()
    {
      var postion = "left-middle";
      var a_left = this._posA.left;
      var a_top = this._posA.top;
      var a_width = this._posA.width;
      var a_height = this._posA.height;
      var b_left = this._posB.left;
      var b_top = this._posB.top;
      var b_width = this._posB.width;
      var b_height = this._posB.height;

      var arrowupdec = new qx.ui.decoration.Decorator().set({
        color : [null,"transparent",this._wendarrow.getBackgroundColor(),"transparent"],
        style : [null,"solid","solid","solid"],
        width : [0,4.5,10,4.5]
      });
      
      var arrowrightdec = new qx.ui.decoration.Decorator().set({
        color : ["transparent",null,"transparent", this._wendarrow.getBackgroundColor()],
        style : ["solid",null,"solid","solid"],
        width : [4.5,0,4.5,10]
      });

      var arrowdowndec = new qx.ui.decoration.Decorator().set({
        color : [this._wendarrow.getBackgroundColor(),"transparent",null,"transparent"],
        style : ["solid", "solid",null,"solid"],
        width : [10,4.5,0,4.5]
      });

      var arrowleftdec = new qx.ui.decoration.Decorator().set({
        color : ["transparent",this._wendarrow.getBackgroundColor(),"transparent",null],
        style : ["solid","solid","solid",null],
        width : [4.5,10,4.5,0]
      });
      
      this._wendarrow.resetOffset();

      if (b_left >= a_left + a_width)
      {
        postion = "left-middle";
        this._wendarrow.setDecorator(arrowrightdec);
        this._wendarrow.setOffsetRight(-3);
      }
      else if((b_left < a_left + a_width) && (b_left + b_width > a_left) && (b_top > a_top + a_height))
      {
        postion = "top-center";
        this._wendarrow.setDecorator(arrowdowndec);
        // adjust offset
        var blp = b_left + Math.round(b_width/2);
        var alp = a_left + Math.round(a_width/2);
        this._wendarrow.setOffsetLeft(Math.round((alp-blp)/2));
        
        // TODO: Figure out bottom offset based on size diff of A and B
        this._wendarrow.setOffsetBottom(-2);

        var linebounds = this._wline3.getBounds();
        this._wline3.setUserBounds(linebounds.left, linebounds.top, linebounds.width, (linebounds.height - 4 - (Math.round(b_height/2))));
      }
      else if((b_left < a_left + a_width) && (b_left + b_width > a_left) && (b_top < a_top + a_height))
      {
        postion = "bottom-center";
        this._wendarrow.setDecorator(arrowupdec);
        // adjust offset
        var blp = b_left + Math.round(b_width/2);
        var alp = a_left + Math.round(a_width/2);
        this._wendarrow.setOffsetLeft(Math.round((alp-blp)/2));

        this._wendarrow.setOffsetTop(-2);
        
        var lineboundsb = this._wline3.getBounds();
        this._wline3.setUserBounds(lineboundsb.left, lineboundsb.top, lineboundsb.width, (lineboundsb.height - 4 - (Math.round(b_height/2))));
      }
      else
      {
        postion = "right-middle";
        this._wendarrow.setDecorator(arrowleftdec);
        this._wendarrow.setOffsetLeft(-3);
      }

      this._wendarrow.setPosition(postion);
      this._wline3.setUserData("endarrow", this._wendarrow);

    },

    /**
     * Repostion existing connections.
     *
     * @param {array} array of line segment objects (Windows).
     * @returns {boolean} 'true' if the operation was done, 'false' if the connection no exists.
     */
    repositionConnections : function(arrlines) 
    {
      //Group and order lines by connect id and segment id
      arrlines.sort();
      var i;
      for (i = 0; i < arrlines.length; i++) { 
        //set up lines
        this._wline1 = arrlines[i]; i++;
        this._wline2 = arrlines[i]; i++;
        this._wline3 = arrlines[i];

        //set up connection
        var conn = this._createConnectionObject(arrlines[i].getUserData("elementA"), arrlines[i].getUserData("elementB"), null, arrlines[i].getUserData("options"));

        // Position connection.
        this._positionConnection(conn);
        //this._wendarrow = this._wline3.getUserData("endarrow");
        //this._positionEndPoint();
      }
    },

    _createConnectionObject : function(elementA, elementB, properties, options)
    {
      // Create connection object.
      var connection = new Object();
      connection.id = this._idgenerator++;
      connection.elementA = elementA;
      connection.elementB = elementB;
      connection.color = (properties != null && properties.backgroundColor != null)? properties.backgroundColor + '' : '#808080';
      //connection.radius = (options != null && options.radius != null && !isNaN(options.radius))? parseInt(options.radius, 10) : 2;
      connection.radius = 3;
      connection.anchorA = (options != null && options.anchorA != null && (options.anchorA == 'vertical' || options.anchorA == 'horizontal'))? options.anchorA : 'horizontal';
      connection.anchorB = (options != null && options.anchorB != null && (options.anchorB == 'vertical' || options.anchorB == 'horizontal'))? options.anchorB : 'horizontal';
      connection.options = options;
      connection.roundedCorners = true;
      return connection;
    }
  }
});