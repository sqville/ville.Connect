/* ************************************************************************

   Copyright: sqville 2022

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */


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

  properties :
  {
    highlightSize: {
      check: "String",
      init: "6px",
      nullable: false
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _idgenerator : 0,

    _wline1 : null,

    _wline2 : null,

    _wline3 : null,

    _wstartarrow : null,

    _wendarrow : null,

     /**
     * Draws a connection between two elements.
     *
     * @param {object} elementA A Qooxdoo Widget object for the first element.
     * @param {object} elementB A Qooxdoo Widget object for the second element.
     * @param {object} properties An object with connector (Qooxdoo Widget object) properties.
     * @param {object} options An object with connector specific properties.
     * @param {object} containerobj A Qooxdoo container object with a canvas layout.
     * @returns {string} The connection identifier or 'null' if the connection could not be draw.
     */
    connect: function (elementA, elementB, properties, options, containerobj) {
        // Verify if the element's selector are ok.
        if(elementA == null || elementB == null || containerobj == null) {
          return null;
        }

        var connection = this._createConnectionObject(elementA, elementB, properties, options);

        var wline1 = this._wline1 = new qx.ui.core.Widget().set(properties);
        var wline2 = this._wline2 = new qx.ui.core.Widget().set(properties);
        var wline3 = this._wline3 = new qx.ui.core.Widget().set(properties);

        var eleAhc = elementA.toHashCode();
        var eleBhc = elementB.toHashCode();
        
        // wline1
        wline1.setUserData("elementtype", "connectline");
        wline1.setUserData("connectid", connection.id);
        wline1.setUserData("segmentid", 1);
        wline1.setUserData("elementAhashcode", eleAhc);
        wline1.setUserData("elementBhashcode", eleBhc);
        // wline2
        wline2.setUserData("elementtype", "connectline");
        wline2.setUserData("connectid", connection.id);
        wline2.setUserData("segmentid", 2);
        wline2.setUserData("elementAhashcode", eleAhc);
        wline2.setUserData("elementBhashcode", eleBhc);
        // wline3
        wline3.setUserData("elementtype", "connectline");
        wline3.setUserData("connectid", connection.id);
        wline3.setUserData("segmentid", 3);
        wline3.setUserData("elementAhashcode", eleAhc);
        wline3.setUserData("elementBhashcode", eleBhc);
        wline3.setUserData("elementAid", elementA.getUserData("model").id);
        wline3.setUserData("elementBid", elementB.getUserData("model").id);
        wline3.setUserData("elementA", elementA);
        wline3.setUserData("elementB", elementB);
        wline3.setUserData("properties", properties);
        wline3.setUserData("options", options);
        

        // last line segment needs to know the other 2 segments
        wline3.setUserData("wline1", wline1);
        wline3.setUserData("wline2", wline2);
        
        /** Connector Quick Edit
         * If editable, add context menu with all quick edit options
         *  */ 
        var linestyles = ["horizontal-horizontal", "horizontal-vertical", "vertical-horizontal", "vertical-vertical", "point-point"];
        var menu = new qx.ui.menu.Menu;
        //var menuheader = new qx.ui.menu.Button("Edit Connector").set({anonymous: true, padding : [ 2, 1 ] });
        //menu.add(menuheader);
        //menu.addSeparator();
        var conntypegroup = new qx.ui.form.RadioGroup();
        for (var j=0; j<linestyles.length; j++)
        {
          var linestyle = new qx.ui.menu.RadioButton(linestyles[j]);
          var conntype = connection.anchorA + "-" + connection.anchorB;
          if (linestyles[j] == conntype){
            linestyle.setValue(true);
          }
          menu.add(linestyle);
          conntypegroup.add(linestyle);
        }

        var anchorpositions = ["center-top", "center", "center-bottom", "left-top", "left-middle", "left-bottom", "right-top", "right-middle", "right-bottom"];
        var anchorApositionmenu = new qx.ui.menu.Menu;
        var anchorApositiongroup = new qx.ui.form.RadioGroup();
        for (var j=0; j<anchorpositions.length; j++)
        {
          var anchApos = new qx.ui.menu.RadioButton(anchorpositions[j]);
          if (anchorpositions[j] == connection.anchorAposition){
            anchApos.setValue(true);
          }
          anchorApositionmenu.add(anchApos);
          anchorApositiongroup.add(anchApos);
        }
        var anchorApositionbutton = new qx.ui.menu.Button("anchor A position", null, null, anchorApositionmenu);

        var anchorBpositionmenu = new qx.ui.menu.Menu;
        var anchorBpositiongroup = new qx.ui.form.RadioGroup();
        for (var j=0; j<anchorpositions.length; j++)
        {
          var anchBpos = new qx.ui.menu.RadioButton(anchorpositions[j]);
          if (anchorpositions[j] == connection.anchorBposition){
            anchBpos.setValue(true);
          }
          anchorBpositionmenu.add(anchBpos);
          anchorBpositiongroup.add(anchBpos);
        }
        var anchorBpositionbutton = new qx.ui.menu.Button("anchor B position", null, null, anchorBpositionmenu);

        var ordermenubuttonback = new qx.ui.menu.Button("send back", null, null);
        ordermenubuttonback.addListener("click", function (){
          var wlined = this.getLayoutParent().getOpener();
          var newzi = wlined.getZIndex() - 1;
          wlined.getUserData("wline1").setZIndex(newzi);
          wlined.getUserData("wline2").setZIndex(newzi);
          wlined.setZIndex(newzi);
          wlined.getUserData("properties").zIndex = newzi;
        });

        var ordermenubuttonforward = new qx.ui.menu.Button("send forward", null, null);
        ordermenubuttonforward.addListener("click", function (){
          var wlined = this.getLayoutParent().getOpener();
          var newzi = wlined.getZIndex() + 1;
          wlined.getUserData("wline1").setZIndex(newzi);
          wlined.getUserData("wline2").setZIndex(newzi);
          wlined.setZIndex(newzi);
          wlined.getUserData("properties").zIndex = newzi;
        });

        var morewindow = new qx.ui.window.Window("Edit Connector - more").set({contentPadding: 0, showMinimize: false, showMaximize: false});
        morewindow.setModal(true);
        morewindow.setMovable(true);
        morewindow.setLayout(new qx.ui.layout.VBox(2));
        containerobj.getApplicationRoot().add(morewindow);
        var morewinscroll = new qx.ui.container.Scroll().set({width: 300, height: 400, allowStretchY: true, padding: 0, margin: 0, contentPadding: [0,4,0,4]});
        var morecontainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(4)).set({padding: 10});
        var saval = "none";
        var eaval = "none";
        if (connection.startArrow)
          saval = connection.startArrow;
        if (connection.endArrow)
          eaval = connection.endArrow;
        morecontainer.add(new qx.ui.basic.Label("appearance:"));
        morecontainer.add(new qx.ui.form.TextField(properties.appearance).set({enabled: false}));
        morecontainer.add(new qx.ui.basic.Label("decorator:"));
        morecontainer.add(new qx.ui.form.TextField(properties.decorator).set({enabled: false}));
        morecontainer.add(new qx.ui.basic.Label("anchorAoffsetTop:"));
        var spinanchorAoffsetTop = new qx.ui.form.Spinner(-80, connection.anchorAoffsetTop, 80).set({maxWidth: 100});
        morecontainer.add(spinanchorAoffsetTop);
        morecontainer.add(new qx.ui.basic.Label("anchorAoffsetLeft:"));
        var spinanchorAoffsetLeft = new qx.ui.form.Spinner(-80, connection.anchorAoffsetLeft, 80).set({maxWidth: 100});
        morecontainer.add(spinanchorAoffsetLeft);
        morecontainer.add(new qx.ui.basic.Label("anchorBoffsetTop:"));
        var spinanchorBoffsetTop = new qx.ui.form.Spinner(-80, connection.anchorBoffsetTop, 80).set({maxWidth: 100});
        morecontainer.add(spinanchorBoffsetTop);
        morecontainer.add(new qx.ui.basic.Label("anchorBoffsetLeft:"));
        var spinanchorBoffsetLeft = new qx.ui.form.Spinner(-80, connection.anchorBoffsetLeft, 80).set({maxWidth: 100});
        morecontainer.add(spinanchorBoffsetLeft);
        morecontainer.add(new qx.ui.basic.Label("strokeWidth:"));
        var spinstrokeWidth = new qx.ui.form.Spinner(2, connection.radius, 40).set({maxWidth: 100});
        morecontainer.add(spinstrokeWidth);

        morecontainer.add(new qx.ui.basic.Label('startArrow (options "clippy-arrow" or "dark-arrow"):').set({rich: true, wrap: true}));
        var tfstartArrow = new qx.ui.form.TextField(saval);
        morecontainer.add(tfstartArrow);

        morecontainer.add(new qx.ui.basic.Label("startArrowsize:"));
        var spinstartArrowsize = new qx.ui.form.Spinner(20, connection.startArrowsize, 80).set({maxWidth: 100});
        morecontainer.add(spinstartArrowsize);
        if (saval == "none") {
          tfstartArrow.setEnabled(false);
          spinstartArrowsize.setEnabled(false);
        }

        morecontainer.add(new qx.ui.basic.Label('endArrow (options "clippy-arrow" or "dark-arrow"):').set({rich: true, wrap: true}));
        var tfendArrow = new qx.ui.form.TextField(eaval);
        morecontainer.add(tfendArrow);

        morecontainer.add(new qx.ui.basic.Label("endArrowsize:"));
        var spinendArrowsize = new qx.ui.form.Spinner(20, connection.endArrowsize, 80).set({maxWidth: 100});
        morecontainer.add(spinendArrowsize);
        if (eaval == "none") {
          tfendArrow.setEnabled(false);
          spinendArrowsize.setEnabled(false);
        }
        morewinscroll.add(morecontainer);

        morewindow.add(morewinscroll, {flex : 1});
        var morewindowapplybtn = new qx.ui.form.Button("Apply"); 
        morewindow.add(morewindowapplybtn);

        var highlightsize = this.getHighlightSize();
        var scolor = qx.theme.manager.Color.getInstance();
        var colr = scolor.resolve("connection-more-highlight");

        var moremenubutton = new qx.ui.menu.Button("more", null, null);
        moremenubutton.addListener("click", function (){
          var wlined = this.getLayoutParent().getOpener();
          wlined.getUserData("wline1").getContentElement().setStyle("outline", colr + " solid " + highlightsize);
          wlined.getUserData("wline2").getContentElement().setStyle("outline", colr + " solid " + highlightsize);
          wlined.getContentElement().setStyle("outline", colr + " solid " + highlightsize);
          morewindow.setUserData("wline1", wlined.getUserData("wline1"));
          morewindow.setUserData("wline2", wlined.getUserData("wline2"));
          morewindow.setUserData("wline3", wlined);
          morewindow.center();
          morewindow.show();
        });

        morewindow.addListener("close", function () {
          this.getUserData("wline1").getContentElement().removeStyle("outline");
          this.getUserData("wline2").getContentElement().removeStyle("outline");
          this.getUserData("wline3").getContentElement().removeStyle("outline");
        });

        // create a model
        var modelSkeleton = { 
          anchorAoffsetTop: connection.anchorAoffsetTop, 
          anchorAoffsetLeft: connection.anchorAoffsetLeft, 
          anchorBoffsetTop: connection.anchorBoffsetTop, 
          anchorBoffsetLeft: connection.anchorBoffsetLeft,
          strokeWidth: connection.radius,
          startArrow: saval,
          startArrowsize: connection.startArrowsize,
          endArrow: eaval,
          endArrowsize: connection.endArrowsize
        };
        var model = qx.data.marshal.Json.createModel(modelSkeleton);

        // create the controller
        var controller = new qx.data.controller.Object(model);

        // connect the name
        controller.addTarget(spinanchorAoffsetTop, "value", "anchorAoffsetTop", true);
        controller.addTarget(spinanchorAoffsetLeft, "value", "anchorAoffsetLeft", true);
        controller.addTarget(spinanchorBoffsetTop, "value", "anchorBoffsetTop", true);
        controller.addTarget(spinanchorBoffsetLeft, "value", "anchorBoffsetLeft", true);
        controller.addTarget(spinstrokeWidth, "value", "strokeWidth", true);
        controller.addTarget(tfstartArrow, "value", "startArrow", true);
        controller.addTarget(spinstartArrowsize, "value", "startArrowsize", true);
        controller.addTarget(tfendArrow, "value", "endArrow", true);
        controller.addTarget(spinendArrowsize, "value", "endArrowsize", true);

        morewindowapplybtn.addListener("click", function (){
          var newoptions = options;
          newoptions.anchorAoffsetTop = model.getAnchorAoffsetTop();
          newoptions.anchorAoffsetLeft = model.getAnchorAoffsetLeft();
          newoptions.anchorBoffsetTop = model.getAnchorBoffsetTop();
          newoptions.anchorBoffsetLeft = model.getAnchorBoffsetLeft();
          newoptions.strokeWidth = model.getStrokeWidth();
          newoptions.startArrowsize = model.getStartArrowsize();
          newoptions.endArrowsize = model.getEndArrowsize();

          if (model.getStartArrow() != "none") {
            newoptions.startArrow = model.getStartArrow();
          }
            
          if (model.getEndArrow() != "none"){
            newoptions.endArrow = model.getEndArrow();
          }
            
          morewindow.getUserData("wline3").setUserData("options", newoptions);
          var arrlinesd = [morewindow.getUserData("wline1"), morewindow.getUserData("wline2"), morewindow.getUserData("wline3")];
          this.repositionConnections(arrlinesd);
        }, this);
        
        menu.addSeparator();
        menu.add(anchorApositionbutton);
        menu.add(anchorBpositionbutton);
        menu.add(ordermenubuttonback);
        menu.add(ordermenubuttonforward);
        menu.addSeparator();
        menu.add(moremenubutton);
        
        menu.setSpacingX(15);
        
        wline1.setContextMenu(menu);
        wline2.setContextMenu(menu);
        wline3.setContextMenu(menu);

        conntypegroup.addListener("changeSelection", function (e){
          var wline = e.getData()[0].getLayoutParent().getOpener();
          var arroptions = e.getData()[0].getLabel().split("-");
          var newoptions = options;
          newoptions.anchorA = arroptions[0];
          newoptions.anchorB = arroptions[1];
          wline.setUserData("options", newoptions);
          var arrlines = [wline.getUserData("wline1"), wline.getUserData("wline2"), wline];
          this.repositionConnections(arrlines);
        }, this);

        anchorApositiongroup.addListener("changeSelection", function (e){
          var wlined = e.getData()[0].getLayoutParent().getOpener().getLayoutParent().getOpener();
          var newaApos = e.getData()[0].getLabel();
          var newoptionsaAp = options;
          newoptionsaAp.anchorAposition = newaApos;
          wlined.setUserData("options", newoptionsaAp);
          var arrlinesd = [wlined.getUserData("wline1"), wlined.getUserData("wline2"), wlined];
          this.repositionConnections(arrlinesd);
        }, this);

        anchorBpositiongroup.addListener("changeSelection", function (e){
          var wlined = e.getData()[0].getLayoutParent().getOpener().getLayoutParent().getOpener();
          var newaBpos = e.getData()[0].getLabel();
          var newoptionsaBp = options;
          newoptionsaBp.anchorBposition = newaBpos;
          wlined.setUserData("options", newoptionsaBp);
          var arrlinesd = [wlined.getUserData("wline1"), wlined.getUserData("wline2"), wlined];
          this.repositionConnections(arrlinesd);
        }, this);  

        containerobj.add(wline1);
        containerobj.add(wline2);
        containerobj.add(wline3); 

        if (options.endArrow) {
          // Create line end shape and add it to the diagram
          var wendarrow = this._wendarrow = new qx.ui.core.Widget();
          wendarrow.setUserData("elementtype", "connectline-endarrow");
          wendarrow.setUserData("connectid", connection.id);
          wline3.setUserData("endArrow", wendarrow);
          containerobj.add(wendarrow);
        }

        if (options.startArrow) {
          // Create line end shape and add it to the diagram
          var wstartarrow = this._wstartarrow = new qx.ui.core.Widget();
          wstartarrow.setUserData("elementtype", "connectline-endarrow");
          wstartarrow.setUserData("connectid", connection.id);
          wline1.setUserData("startArrow", wstartarrow);
          containerobj.add(wstartarrow);
        }
        
        // Position connection.
        this._positionConnection(connection);

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
  /* default - center
  center-top, center-bottom, 
  left-top, left-middle, left-bottom, 
  right-top, right-middle, right-bottom
  offsetLeft, offsetTop
  */
  this._wline1.setVisibility("visible");
  this._wline2.setVisibility("visible");
  this._wline3.setVisibility("visible");

  var endAsize = parseInt(connection.endArrowsize, 10);
  var startAsize = parseInt(connection.startArrowsize, 10);

  //var posA = this._posA = connection.elementA.getBounds();
  var posA = connection.elementA.getBounds();
  var posB = connection.elementB.getBounds();
  var pAleft, pBleft, pAtop, pBtop;

  switch (connection.anchorAposition) {
    case "center-top" :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
      pAtop = parseInt(posA.top, 10);
      break;
    case "center-bottom" :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height), 10);
      break;
    case "left-top" :
      pAleft = parseInt(posA.left, 10);
      pAtop = parseInt(posA.top, 10);
      break;
    case "left-middle" :
      pAleft = parseInt(posA.left, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height)/2, 10);
      break;
    case "left-bottom" :
      pAleft = parseInt(posA.left, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height), 10);
      break;
    case "right-top" :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width, 10);
      pAtop = parseInt(posA.top, 10);
      break;
    case "right-middle" :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height)/2, 10);
      break;
    case "right-bottom" :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height), 10);
      break;
    default :
      pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
      pAtop = parseInt(posA.top, 10) + parseInt((posA.height)/2, 10);
  }

  switch (connection.anchorBposition) {
    case "center-top" :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
      pBtop = parseInt(posB.top, 10);
      break;
    case "center-bottom" :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height), 10);
      break;
    case "left-top" :
      pBleft = parseInt(posB.left, 10);
      pBtop = parseInt(posB.top, 10);
      break;
    case "left-middle" :
      pBleft = parseInt(posB.left, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height)/2, 10);
      break;
    case "left-bottom" :
      pBleft = parseInt(posB.left, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height), 10);
      break;
    case "right-top" :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width, 10);
      pBtop = parseInt(posB.top, 10);
      break;
    case "right-middle" :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height)/2, 10);
      break;
    case "right-bottom" :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height), 10);
      break;
    default :
      pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
      pBtop = parseInt(posB.top, 10) + parseInt((posB.height)/2, 10);
  }

  // apply any offsets
  pAleft = pAleft + parseInt(connection.anchorAoffsetLeft, 10);
  pAtop = pAtop + parseInt(connection.anchorAoffsetTop, 10);
  pBleft = pBleft + parseInt(connection.anchorBoffsetLeft, 10);
  pBtop = pBtop + parseInt(connection.anchorBoffsetTop, 10);

  // Verify if the elements are aligned in a horizontal or vertical line.
  if(pAleft == pBleft || pAtop == pBtop) {
    // Verify if the line must be vertical or horizonal
    if(pAleft == pBleft) {
      // VERTICAL LINE
      this._positionVerticalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);

      /*direction arrow (UP or DOWN)
      if (connection.direction) {
        this._paintarrowline (this._wline1, "vertical", pAtop, pBtop, connection.direction);
      }
      */

      if (connection.endArrow) {
        // set left or right decorator arrow
        if (pAtop < pBtop) {
          this._wendarrow.setDecorator(connection.endArrow + "-up");
          pBleft = pBleft - parseInt((endAsize)/2, 10);
          pBtop = pBtop - parseInt((endAsize)/2, 10);
        }
        else {
          this._wendarrow.setDecorator(connection.endArrow + "-down");
          pBleft = pBleft - parseInt((endAsize)/2, 10);
          pBtop = pBtop - parseInt((endAsize)/2, 10);
        }
        this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
        this._wendarrow.getContentElement().removeStyle("transform");
        this._wendarrow.setVisibility("visible");
      }

      if (connection.startArrow) {
        // set left or right decorator arrow
        if (pAtop < pBtop) {
          this._wstartarrow.setDecorator(connection.startArrow + "-down");
          pAleft = pAleft - parseInt((startAsize)/2, 10);
          pAtop = pAtop - parseInt((startAsize)/2, 10);
        }
        else {
          this._wstartarrow.setDecorator(connection.startArrow + "-up");
          pAleft = pAleft - parseInt((startAsize)/2, 10);
          pAtop = pAtop - parseInt((startAsize)/2, 10);
        }
        this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
        this._wstartarrow.getContentElement().removeStyle("transform");
        this._wstartarrow.setVisibility("visible");
      }
        
    } else {
        // HORIZONTAL LINE
        // Draw the line
        this._positionHorizontalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);

        /*direction arrow (LEFT or RIGHT)
        if (connection.direction) {
          this._paintarrowline (this._wline1, "horizontal", pAleft, pBleft, connection.direction);
        }
        */

        if (connection.endArrow) {
          // set left or right decorator arrow
          if (pAleft < pBleft) {
            this._wendarrow.setDecorator(connection.endArrow + "-right");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          else {
            this._wendarrow.setDecorator(connection.endArrow + "-left");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
          this._wendarrow.getContentElement().removeStyle("transform");
          this._wendarrow.setVisibility("visible");
        }

        if (connection.startArrow) {
          // set left or right decorator arrow
          if (pAleft < pBleft) {
            this._wstartarrow.setDecorator(connection.startArrow + "-left");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          else {
            this._wstartarrow.setDecorator(connection.startArrow + "-right");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
          this._wstartarrow.getContentElement().removeStyle("transform");
          this._wstartarrow.setVisibility("visible");
        }
      }
      this._wline2.setUserBounds(pBleft, pBtop, 2, 2);
      this._wline3.setUserBounds(pBleft, pBtop, 2, 2);
      this._wline2.setVisibility("hidden");
      this._wline3.setVisibility("hidden");
      
  } else {
    // Verify point to point (diagonal line)
    if (connection.anchorA == "point" || connection.anchorB == "point") {
      //this._positionHorizontalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);
      var transval = this._positionDiagonalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);

      /*
      if (connection.direction) {
        this._paintarrowline (this._wline1, "horizontal", pAleft, pBleft, connection.direction);
      }
      */

      this._wline2.setUserBounds(pAleft, pAtop, 2, 2);
      this._wline3.setUserBounds(pBleft, pBtop, 2, 2);

      this._wline2.setVisibility("hidden");
      this._wline3.setVisibility("hidden");
      if (connection.endArrow) {
        // set left or right decorator arrow
        if (pAleft < pBleft) {
          this._wendarrow.setDecorator(connection.endArrow + "-right");
          pBleft = pBleft - parseInt((endAsize)/2, 10);
          pBtop = pBtop - parseInt((endAsize)/2, 10);
        }
        else {
          this._wendarrow.setDecorator(connection.endArrow + "-left");
          pBleft = pBleft - parseInt((endAsize)/2, 10);
          pBtop = pBtop - parseInt((endAsize)/2, 10);
        }
        this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
        transval["transform-origin"] = "center";
        this._wendarrow.getContentElement().setStyles(transval);
        this._wendarrow.setVisibility("visible");
      }

      if (connection.startArrow) {
        // set left or right decorator arrow
        if (pAleft < pBleft) {
          this._wstartarrow.setDecorator(connection.startArrow + "-left");
          pAleft = pAleft - parseInt((startAsize)/2, 10);
          pAtop = pAtop - parseInt((startAsize)/2, 10);
        }
        else {
          this._wstartarrow.setDecorator(connection.startArrow + "-right");
          pAleft = pAleft - parseInt((startAsize)/2, 10);
          pAtop = pAtop - parseInt((startAsize)/2, 10);
        }
        this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
        transval["transform-origin"] = "center";
        this._wstartarrow.getContentElement().setStyles(transval);
        this._wstartarrow.setVisibility("visible");
      }
    }
    // Verify if must use two lines or three.
    else if(connection.anchorA != connection.anchorB) {
      // Check the anchors of the elements.
      var corner = new Object();
      if(connection.anchorA == 'vertical') {
        // Find the corner's position.
        corner.left = pAleft;
        corner.top = pBtop;
          
        // Draw lines.
        this._positionVerticalLine(this._wline1, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        this._positionHorizontalLine(this._wline2, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        /*
        if (connection.direction) {
          this._paintarrowline (this._wline1, "vertical", pAtop, pBtop, connection.direction);
          this._paintarrowline (this._wline2, "horizontal", pAleft, pBleft, connection.direction);
        }
        */

        if (connection.endArrow) {
          // set left or right decorator arrow
          if (pAleft < pBleft) {
            this._wendarrow.setDecorator(connection.endArrow + "-right");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          else {
            this._wendarrow.setDecorator(connection.endArrow + "-left");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
          this._wendarrow.getContentElement().removeStyle("transform");
          this._wendarrow.setVisibility("visible");
        }

        if (connection.startArrow) {
          // set left or right decorator arrow
          if (pAtop < pBtop) {
            this._wstartarrow.setDecorator(connection.startArrow + "-up");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          else {
            this._wstartarrow.setDecorator(connection.startArrow + "-down");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
          this._wstartarrow.getContentElement().removeStyle("transform");
          this._wstartarrow.setVisibility("visible");
        }

      } else {
        // Find the corner's position.
        corner.left = pBleft;
        corner.top = pAtop;
        
        // Draw lines.
        this._positionVerticalLine(this._wline1, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
        this._positionHorizontalLine(this._wline2, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);

       /*
        if (connection.direction) {
          this._paintarrowline (this._wline1, "vertical", pAtop, pBtop, connection.direction);
          this._paintarrowline (this._wline2, "horizontal", pAleft, pBleft, connection.direction);
        }
        */

        if (connection.endArrow) {
          // set left or right decorator arrow
          if (pAtop < pBtop) {
            this._wendarrow.setDecorator(connection.endArrow + "-down");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          else {
            this._wendarrow.setDecorator(connection.endArrow + "-up");
            pBleft = pBleft - parseInt((endAsize)/2, 10);
            pBtop = pBtop - parseInt((endAsize)/2, 10);
          }
          this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
          this._wendarrow.getContentElement().removeStyle("transform");
          this._wendarrow.setVisibility("visible");
        }

        if (connection.startArrow) {
          // set left or right decorator arrow
          if (pAleft < pBleft) {
            this._wstartarrow.setDecorator(connection.startArrow + "-left");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          else {
            this._wstartarrow.setDecorator(connection.startArrow + "-right");
            pAleft = pAleft - parseInt((startAsize)/2, 10);
            pAtop = pAtop - parseInt((startAsize)/2, 10);
          }
          this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
          this._wstartarrow.getContentElement().removeStyle("transform");
          this._wstartarrow.setVisibility("visible");
        }

      }

      //this._wline3.setUserBounds(pBleft, pBtop, 2, 2);
      this._wline3.setVisibility("hidden");
      

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
              
              /*
              if (connection.direction) {
                this._paintarrowline (this._wline1, "vertical", pAtop, pBtop, connection.direction);
                this._paintarrowline (this._wline2, "vertical", pAtop, pBtop, connection.direction);
                this._paintarrowline (this._wline3, "horizontal", pAleft, pBleft, connection.direction);
              }
              */

              if (connection.endArrow) {
                // set left or right decorator arrow
                if (pAtop < pBtop) {
                  this._wendarrow.setDecorator(connection.endArrow + "-down");
                  pBleft = pBleft - parseInt((endAsize)/2, 10);
                  pBtop = pBtop - parseInt((endAsize)/2, 10);
                }
                else {
                  this._wendarrow.setDecorator(connection.endArrow + "-up");
                  pBleft = pBleft - parseInt((endAsize)/2, 10);
                  pBtop = pBtop - parseInt((endAsize)/2, 10);
                }
                this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
                this._wendarrow.getContentElement().removeStyle("transform");
                this._wendarrow.setVisibility("visible");
              }

              if (connection.startArrow) {
                // set left or right decorator arrow
                if (pAtop < pBtop) {
                  this._wstartarrow.setDecorator(connection.startArrow + "-up");
                  pAleft = pAleft - parseInt((startAsize)/2, 10);
                  pAtop = pAtop - parseInt((startAsize)/2, 10);
                }
                else {
                  this._wstartarrow.setDecorator(connection.startArrow + "-down");
                  pAleft = pAleft - parseInt((startAsize)/2, 10);
                  pAtop = pAtop - parseInt((startAsize)/2, 10);
                }
                this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
                this._wstartarrow.getContentElement().removeStyle("transform");
                this._wstartarrow.setVisibility("visible");
              }

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

              /*
              if (connection.direction) {
                this._paintarrowline (this._wline1, "horizontal", pAleft, pBleft, connection.direction);
                this._paintarrowline (this._wline2, "horizontal", pAleft, pBleft, connection.direction);
                this._paintarrowline (this._wline3, "vertical", pAtop, pBtop, connection.direction);
              }
              */

              if (connection.endArrow) {
                // set left or right decorator arrow
                if (pAleft < pBleft) {
                  this._wendarrow.setDecorator(connection.endArrow + "-right");
                  pBleft = pBleft - parseInt((endAsize)/2, 10);
                  pBtop = pBtop - parseInt((endAsize)/2, 10);
                }
                else {
                  this._wendarrow.setDecorator(connection.endArrow + "-left");
                  pBleft = pBleft - parseInt((endAsize)/2, 10);
                  pBtop = pBtop - parseInt((endAsize)/2, 10);
                }
                this._wendarrow.setUserBounds(pBleft, pBtop, endAsize, endAsize);
                this._wendarrow.getContentElement().removeStyle("transform");
                this._wendarrow.setVisibility("visible");
              }

              if (connection.startArrow) {
                // set left or right decorator arrow
                if (pAleft < pBleft) {
                  this._wstartarrow.setDecorator(connection.startArrow + "-left");
                  pAleft = pAleft - parseInt((startAsize)/2, 10);
                  pAtop = pAtop - parseInt((startAsize)/2, 10);
                }
                else {
                  this._wstartarrow.setDecorator(connection.startArrow + "-right");
                  pAleft = pAleft - parseInt((startAsize)/2, 10);
                  pAtop = pAtop - parseInt((startAsize)/2, 10);
                }
                this._wstartarrow.setUserBounds(pAleft, pAtop, startAsize, startAsize);
                this._wstartarrow.getContentElement().removeStyle("transform");
                this._wstartarrow.setVisibility("visible");
              }

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
      qxElement.getContentElement().removeStyle("transform", true);
    },

    /**
    * Draws a horizontal line, between the two points, by changing the properties of a HTML element.
    *
    *@param {object} qxElement A Qooxdoo Widget object used to represent the line.
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
      qxElement.getContentElement().removeStyle("transform", true);
    },

    _positionDiagonalLine : function(qxElement, point1left, point1top, point2left, point2top, radius, roundedCorners) 
    {
      var halfRadius = parseInt(radius/2, 10);
      var posL = (point1left > point2left)? (point2left - halfRadius) : (point1left - halfRadius);
      var posT = point1top - halfRadius;
      var linewidth = Math.abs(point1left - point2left + radius); 

      // rotate line
      var wid = Math.abs(point1left-point2left);
      var heig = Math.abs(point1top-point2top);
      var diag = Math.round(Math.sqrt((wid*wid) + (heig*heig)));
      var rad = Math.asin(heig/diag); 
      var degs = 0;
      var adjust = diag - linewidth;
      if ((point1top < point2top)) {
        //posT = posT - halfRadius;
        if ((point1left > point2left)) {
          degs = -Math.round((rad * 180.0) / Math.PI);
          posL = posL - adjust;
        }
        else {
          degs = Math.round((rad * 180.0) / Math.PI);
          //posL = posL - adjust;
        }
      } else {
        //posT = posT + halfRadius;
        if ((point1left > point2left)) {
          degs = Math.round((rad * 180.0) / Math.PI);
          posL = posL - adjust;
        }
        else {
          degs = -Math.round((rad * 180.0) / Math.PI);
        }
          
      }
      var transformorg = (point1left < point2left)? "left" : "right";

      
      linewidth = diag;
      
      
      qxElement.setUserBounds(posL, posT, linewidth, radius);

      var transvals = {
        "transform": "rotate(" + degs + "deg)",
        "transform-origin": transformorg
      };

      qxElement.getContentElement().setStyles(transvals);
      //var linedom = qxElement.getContentElement().getDomElement(true);
      //qx.bom.element.Transform.setOrigin(linedom, transformorg);
      //qx.bom.element.Transform.rotate(linedom, degs + "deg");

      return transvals;
    },

    /*
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
    */

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
        if (this._wline3.getUserData("endArrow"))
          this._wendarrow = this._wline3.getUserData("endArrow");
        if (this._wline1.getUserData("startArrow"))
          this._wstartarrow = this._wline1.getUserData("startArrow");

        //set up connection
        var conn = this._createConnectionObject(arrlines[i].getUserData("elementA"), arrlines[i].getUserData("elementB"), arrlines[i].getUserData("properties"), arrlines[i].getUserData("options"));
        
        // Position connection.
        this._positionConnection(conn);
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
      // default values
      connection.radius = 12;
      connection.anchorAposition = "center";
      connection.anchorBposition = "center";
      connection.anchorAoffsetTop = 0;
      connection.anchorAoffsetLeft = 0;
      connection.anchorBoffsetTop = 0;
      connection.anchorBoffsetLeft = 0;
      //connection.direction = "none";
      connection.endArrowsize = 20;
      connection.startArrowsize = 20;

      if (options.strokeWidth) 
        connection.radius = options.strokeWidth;
      if (options.anchorAposition)
        connection.anchorAposition = options.anchorAposition;
      if (options.anchorBposition)
        connection.anchorBposition = options.anchorBposition;
      if (options.anchorAoffsetTop)
        connection.anchorAoffsetTop = options.anchorAoffsetTop;
      if (options.anchorAoffsetLeft)
        connection.anchorAoffsetLeft = options.anchorAoffsetLeft;
      if (options.anchorBoffsetTop)
        connection.anchorBoffsetTop = options.anchorBoffsetTop;
      if (options.anchorBoffsetLeft)
        connection.anchorBoffsetLeft = options.anchorBoffsetLeft;
      //if (options.direction)
      //  connection.direction = options.direction;
      if (options.endArrow)
        connection.endArrow = options.endArrow;
      if (options.endArrowsize)
        connection.endArrowsize = options.endArrowsize;
      if (options.startArrow)
        connection.startArrow = options.startArrow;
      if (options.startArrowsize)
        connection.startArrowsize = options.startArrowsize;
        
      connection.anchorA = options.anchorA;
      connection.anchorB = options.anchorB;
      connection.options = options;
      connection.properties = properties;
      connection.roundedCorners = true;
      return connection;
    },

    /*
    _paintarrowline : function(element, position, pA, pB, direction)
    {
      element.getContentElement().removeAllClasses();
      if (position == "vertical") {
        if (pA < pB && direction == "AtoB") 
          element.getContentElement().addClass("chevarrowdown");
        else if (pA > pB && direction == "AtoB")
          element.getContentElement().addClass("chevarrowup");
        else if (pA < pB && direction == "BtoA")
          element.getContentElement().addClass("chevarrowup");
        else if (pA > pB && direction == "BtoA")
          element.getContentElement().addClass("chevarrowdown");
        else if (direction == "both")
          element.getContentElement().addClass("chevarrowvertboth");
      } else {
        if (pA < pB && direction == "AtoB")
          element.getContentElement().addClass("chevarrowrt");
        else if (pA > pB && direction == "AtoB")
          element.getContentElement().addClass("chevarrowlt");
        else if (pA < pB && direction == "BtoA")
          element.getContentElement().addClass("chevarrowlt");
        else if (pA > pB && direction == "BtoA")
          element.getContentElement().addClass("chevarrowrt");
        else if (direction == "both")
          element.getContentElement().addClass("chevarrowhorzboth");
      }
      
    },
    */

    _roundcorners : function(qxElement, radius)
    {
      return true;
    }
  }
});