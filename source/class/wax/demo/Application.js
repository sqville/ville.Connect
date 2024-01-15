/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

   Skeleton: wax-editor-right-to-left

   Wax Demo: Wax Editor 01

************************************************************************ */

/**
 * This is the main application class of your custom application "wax"
 *
 * @asset(wax/demo/*)
 */
qx.Class.define("wax.demo.Application",
{
  extend : qx.application.Standalone,

    /*
  *****************************************************************************
    PROPERTIES
  *****************************************************************************
  */

 properties :
 {
   demoMode :
   {
     check : ["desktop", "mobile"],
     init : "desktop"
   }
 },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _blocker : null,
    
    _northBox : null,
    
    _westBox : null,
    
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
      
      // >>> START of Base Scaffolding >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>> Base Scaffolding are objects common to all Wax - Franklin based apps  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      // App's Root
      var approot = this.getRoot();

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "transparent"});
      
      // Dock's North section (Canvas)
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});

      // Dock's West section (VBox)
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({backgroundColor: "white", padding: [10,0,10,0], decorator : "leftside"});

      // Dock's Center section (Stack) === THE STACK ===
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: 0});

      // phone/phonegap
      //if (qx.core.Environment.get("phonegap")) {
      var southbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle", padding: [0,4,0,4], decorator: "bottombar"});
      //}

      // West Scroll area to fit all menu items
      var scrollwest = new qx.ui.container.Scroll().set({scrollbarX: "off", minWidth: 230, padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // Center Scroll area to fit all content
      var scroll = new qx.ui.container.Scroll().set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar().set({backgroundColor: "white"});
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Icon Images
      var menuimage = "wax/demo/round-menu-24px.svg";
      var roundacct = "wax/demo/round-account_circle-24px.svg";

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", menuimage).set({show: "icon"});

      // Top-Right MenuButton
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", roundacct).set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowGrowY: true, padding: 10});
      mainmenupopup.setLayout(new qx.ui.layout.VBox(0));

      // Profile and Settings Menu and Menu Buttons
      var profilemenu = new qx.ui.menu.Menu().set({spacingX: 12});
      var aboutmenubutton1 = new qx.ui.menu.Button("About Wax", "wax/demo/info-24px.svg").set({padding: 10});
      aboutmenubutton1.getChildControl("icon").set({ width: 24, height: 24 });

      //create About Wax popup window
      var winAboutWax = this.__createDetailWindow();

      winAboutWax.getLayout().set({spacing: 20});
      winAboutWax.set({caption: "About Wax", contentPadding: 0, status: "Github repo coming soon"});
      var txtaboutwax = "Wax aims to be a rapid application development and prototyping tool/system. There's a spectrum of rapid-app-dev tools (or low-code tools) - Outsystems, Appian and Ionic on the high-end, Foundation, Gatsbyjs and SemanticUI on the other. Wax is currently not yet on this spectrum, but it does have an approach and supporting assets to begin the process of becoming a highly effective and useful app-dev/app-prototyping asset.<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>THE APPROACH (so far):</span><br><br>";
      txtaboutwax += "<b>Build Qooxdoo skeletons (and lots of them) that function on multiple devices or use case scenarios.</b> A typical use case - After meeting with the client and gathering initial requirements, the prototype developer generates an application using a skeleton (chosen from a long list of skeletons) that best meets the initial requirements. Just like website templates found on the web, Qooxdoo skeletons would encompass enough functionality to help produce a high fidelity prototype in a matter of a few days. There is the potential that a skeleton could also include mock data (json) and non-Qooxdoo scripts to set up a cloud backend (not yet proven out). Skeletons could even include non-Qooxdoo templates for native mobile frameworks such as React Native, Flutter and Felgo (easy to do since skeleton templates are just static files with mustache-like tags).<br><br>";
      txtaboutwax += "<b>Cut and paste components from a well-stocked and possibly specially-tailored demo browser application.</b> Just as we do today, we cut and paste code from examples into our apps. Properly constructed skeletons and documented demos could facilitate the rapid integration of components into any application (not yet proven out). Wax skeletons, and resulting applications would be divided out logically into three areas: Scaffolding, Wiring and Appearance. Scaffolding includes object creation, placement and initial configuration. Wiring involves application flow (mostly via event listener creation and assignment). Appearance is simple look and feel via theming and animations. Skeletons would include an appropriate amount of Appearance and animation code, but when the goal is to rapidly produce a high fidelity prototype Scaffolding and Wiring would be the top focus.<br><br>";
      txtaboutwax += "<b>Use other frameworks for native mobile applications, and sync changes made in the main Qooxdoo app with the produced (from a skeleton) native mobile framework project.</b> Converting Qooxdoo produced code to React Native code, for example, is relatively easy. Object hierarchy is taken from getObjectRegistry method of the Application (taken from Inspector application). UI objects and their properties can be easily mapped and organized (proven out to a small degree). The difficult part is how to best get the changes to (and from) the native mobile project. Using qooxdoo compiler would be ideal, but the compiler does not have access to the apps object hierarchy. The approach Wax would take is to mimic the manual means of producing code. The manual means goes something like this: Include InspectorModel.js file in a project. Add a control (Button) to execute the reading of the ObjectRegistry and translation to the target framework. Write the translation to the console (or a TextArea object). Cut and paste resulting code to the other project.  A more automated approach would be to include an Electronjs project/app in the skeleton for the user to run at any given time. Electronjs would then sync the resulting translation to the target native mobile project. This Electronjs, automated approach has not yet been proven out.<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>CONCLUSION:</span><br><br>";
      txtaboutwax += "Is Wax, or even the concept of Wax, a worthwhile endeavor? Can the needed productivity gains be met in order to call itself a rapid app-dev tool? Is the noted approach the right way forward? It completely leaves out any type of changes being made, or needed, to qooxdoo compiler. Red flag, or just using the simplest approach is the best approach, approach? This is all a head-scratcher for sure. Too many unknowns without enough time. Welcome to software solution development :-)<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>SPECIAL NOTE:</span><br><br>";
      txtaboutwax += "Skeletons and the demo browser are not new concepts to Qooxdoo. These features have been around since the beginning. The purpose of this writeup is to convey good-intent, thoughts and ideas on how to improve peoples work lives, and not meant to be critical or take credit for anything in anyway. The past and current qooxdoo core team have done, and are doing, phenomenal work. My thanks go out to them for making me look better than I really am - Cheers.";
      //var aboutbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      var aboutscroll = new qx.ui.container.Scroll().set({ allowStretchY: true, padding: 0, margin: 0, contentPadding: [0,24,0,24]});
      var waxatom = new qx.ui.basic.Atom(txtaboutwax,"wax/demo/ville_Wax.png").set({rich: true, iconPosition: "top", gap: 30, paddingTop: 30});
      waxatom.getChildControl("icon").set({scale: true, width: 300, height: 106});
      waxatom.getChildControl("label").set({wrap: true});
      aboutscroll.add(waxatom);

      winAboutWax.add(aboutscroll, {flex:1});
      var btnClosewinAbout = new qx.ui.form.Button("Close Window").set({marginBottom: 18, maxWidth: 300, alignX: "center", alignY: "middle"});
      //winAboutWax.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      winAboutWax.add(btnClosewinAbout);
      /*winAboutWax.addListener("execute", function(e) {
        winAboutWax.restore();
        winAboutWax.center();
        winAboutWax.show();
      }, this);*/
      btnClosewinAbout.addListener("execute", function(e) {
        winAboutWax.close();
      }, this);

      approot.addListener("resize", function(e){
        winAboutWax.center();
      }, this);

      aboutmenubutton1.addListener("execute", function(e) {
        winAboutWax.restore();
        winAboutWax.maximize();
        winAboutWax.center();
        winAboutWax.show();
      }, this);

      
      // Add Main Menu Popup Listeners
      mainmenubtnbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenubtnbutton.getZIndex());
        }
        mainmenupopup.show();
      }, this);
      mainmenupopup.addListener("disappear", function(e)
      {
        this._blocker.unblock();
      }, this);

      // Assemble all base pieces  
      scrollwest.add(westbox);
      scroll.add(centerbox);
      appcompdock.add(northhbox, {edge:"north"});
      appcompdock.add(scrollwest, {edge:"west"});
      appcompdock.add(centerbox, {edge:"center"});
      approot.add(appcompdock, {edge: 0});
      profilemenu.add(aboutmenubutton1);
      profilemenubutton.setMenu(profilemenu);

      var atmlogocurrentpage = new qx.ui.basic.Atom("Wax","wax/demo/ville_Diagram_logo.svg").set({font: "hym-app-header", gap: 10, padding: 0, visibility: "hidden"});
      atmlogocurrentpage.getChildControl("icon").set({ scale: true, width: 41, height: 38 });
      mainmenupart.add(mainmenubtnbutton);
      profilepart.add(profilemenubutton);
      
      northtoolbar.add(mainmenupart);
      northtoolbar.addSpacer();
      northtoolbar.add(atmlogocurrentpage);
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);

      northhbox.add(northtoolbar, {left: 0, right: 0});

      appcompdock.add(southbox, {edge: "south"});

      // *** END of Base Scaffolding ********************************************************

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {duration: 300, timing: "ease", keyFrames : {
        0: {opacity: 0},
        100: {opacity: .08}
        }};

      this._blocker.addListener("blocked", function(e) {
        var domtable;
        if (domtable = this._blocker.getBlockerElement().getDomElement()) {
          qx.bom.element.Animation.animate(domtable, fadeinb);
        }
      }, this);



      // *** Populate THE STACK ************************************************************
      // Network Diagram
      // Basic Flowchart
      // ***********************************************************************************
      var dashboardpage = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      var overviewpage = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      var widgetconnectpage = new qx.ui.container.Composite(new qx.ui.layout.Canvas());

      //One connect object for all diagrams
      var villeconnect = new ville.connect.Connect();

      //Be sure to include ville.Connet's Appearance and Decoration entries
      qx.Theme.include(qx.theme.manager.Appearance.getInstance().getTheme(), ville.connect.Appearance);
      qx.Theme.include(qx.theme.manager.Decoration.getInstance().getTheme(), ville.connect.Decoration);
      

      // STACK - PAGE #1 - Network Diagram
      var wmNetworkdiagram = new qx.ui.window.Manager();
      var desktop_Networkdiagram = new qx.ui.window.Desktop(wmNetworkdiagram);
      desktop_Networkdiagram.setUserData("diagramtype", "windows");
      var data_Networkdiagram = wax.demo.DiagramData.DIAGRAMS["NetworkDiagram"];

      //elements for Network Diagram
      if (data_Networkdiagram.elements != undefined) {
        for (var j=0; j<data_Networkdiagram.elements.length; j++)
        {
          var defsh = data_Networkdiagram.elements[j];
          var winsh = new qx.ui.window.Window();
          winsh.set({
            showMaximize : false,
            showMinimize : false,
            showClose : false,
            useMoveFrame : true,
            contentPadding : 0,
            padding: 0,
            margin: 0
          });
          winsh.setLayout(new qx.ui.layout.Grow());
          var winshcb = winsh.getChildControl("captionbar");
          winshcb.set({cursor:"move", minHeight: 30});
          winsh.setAppearance("element");

          winsh.addListener("activate", function(){
            winshcb.setVisibility("visible");
          });
          winsh.addListener("deactivate", function(){
            winshcb.setVisibility("hidden");
          });      

          var lblatom = new qx.ui.basic.Atom(defsh.options.content, defsh.options.image).set({iconPosition: "top"});
          lblatom.set({anonymous: true, backgroundColor: "transparent", rich:true, center:true, padding:4, allowGrowX:true, allowGrowY:true});
          lblatom.getChildControl('label').set({textAlign:"center"});
          
          winsh.add(lblatom);
          winsh.setUserData("elementid", defsh.id);
          winsh.moveTo(defsh.left, defsh.top);

          // get all windows for window listners to leverage
          var allnetdiawins = desktop_Networkdiagram.getWindows();

          // add move listner to each element
          winsh.addListener("move", function(e) {
            var arrwins = [];
            allnetdiawins.forEach(function(winobj) {
              if (winobj.getUserData("elementtype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            villeconnect.repositionConnections(arrwins);
          });

          // add resize listner to each element.
          winsh.addListener("resize", function(e) {
            var arrwins = [];
            allnetdiawins.forEach(function(winobj) {
              if (winobj.getUserData("elementtype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            villeconnect.repositionConnections(arrwins);
          });

          desktop_Networkdiagram.add(winsh);
          winsh.open();
          winsh.set(defsh.properties);
        }
      }

      // TODO:: Figure out what proper scrolling looks like so that diagrams can be bigger than the viewport
      desktop_Networkdiagram.setLayoutProperties({desktop: false});


      // draw connectors on appear of the diagram viewer
      desktop_Networkdiagram.addListenerOnce("appear", function(e) {
        var alldsktpwins = desktop_Networkdiagram.getWindows();
        //desktop_Networkdiagram.getContentElement().enableScrolling();
        //Connections
        if (data_Networkdiagram.connections != undefined) {
          for (var k=0; k<data_Networkdiagram.connections.length; k++)
          {
            var defc = data_Networkdiagram.connections[k];
            var eleA = alldsktpwins.find(function(elA) { 
              return elA.getUserData("elementid") == defc.elementA;
            });
            var eleB = alldsktpwins.find(function(elB) {
              return elB.getUserData("elementid") == defc.elementB;
            });
            villeconnect.connect(eleA, eleB, defc.properties, defc.options, desktop_Networkdiagram);
          }
        }
      });

      dashboardpage.add(desktop_Networkdiagram);

       
      // STACK - PAGE #2 - Basic Flowchart
      var wmBasicflowchart = new qx.ui.window.Manager();
      var desktop_Basicflowchart = new qx.ui.window.Desktop(wmBasicflowchart);
      desktop_Basicflowchart.setUserData("diagramtype", "windows");
      var data_Basicflowchart = wax.demo.DiagramData.DIAGRAMS["BasicFlowchart"];

      //elements
      if (data_Basicflowchart.elements != undefined) {
        for (var j=0; j<data_Basicflowchart.elements.length; j++)
        {
          var defsh = data_Basicflowchart.elements[j];
          var winsh = new qx.ui.window.Window();
          winsh.set({
            showMaximize : false,
            showMinimize : false,
            showClose : false,
            useMoveFrame : true,
            contentPadding : 0,
            padding: 0,
            margin: 0
          });
          winsh.setLayout(new qx.ui.layout.Grow());
          var winshcb = winsh.getChildControl("captionbar");
          winshcb.set({cursor:"move", minHeight: 30});
          winsh.setAppearance("element");

          winsh.addListener("activate", function(){
            winshcb.setVisibility("visible");
          });
          winsh.addListener("deactivate", function(){
            winshcb.setVisibility("hidden");
          });

          var lblatom = new qx.ui.basic.Atom(defsh.options.content);  
          lblatom.set({anonymous: true, backgroundColor: "transparent", rich:true, center:true, padding:4, allowGrowX:true, allowGrowY:true});
          lblatom.getChildControl('label').set({textAlign:"center"});
          var element = new qx.ui.core.Widget().set({
            backgroundColor: "transparent",
            decorator: defsh.options.shape
          });
          if (defsh.options.element == "diamond"){
            //winsh.add(iconlabel);
            winsh.setLayout(new qx.ui.layout.Canvas());
            winsh.set({width: 120, height: 146});
            element.getContentElement().setStyles({"transform" : "rotate(45deg)"});
            winsh.add(element, {top: "15%", left: "15%", bottom: "15%", right: "15%"});
            winsh.add(lblatom, {width: "100%", height: "100%"});
          } else {
            winsh.add(element);
            winsh.add(lblatom);
          }
              
          winsh.setUserData("elementid", defsh.id);
          winsh.moveTo(defsh.left, defsh.top);

          // get all windows for window listners to leverage
          var allwins = desktop_Basicflowchart.getWindows();

          // add move listner to each element
          winsh.addListener("move", function(e) {
            var arrwins = [];
            allwins.forEach(function(winobj) {
              if (winobj.getUserData("elementtype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            villeconnect.repositionConnections(arrwins);
          });

          // add resize listner to each element.
          winsh.addListener("resize", function(e) {
            var arrwins = [];
            allwins.forEach(function(winobj) {
              if (winobj.getUserData("elementtype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            villeconnect.repositionConnections(arrwins);
          });


          desktop_Basicflowchart.add(winsh);
          winsh.open();
          winsh.set(defsh.properties);
        }
      }

      
      // draw connectors on appear of the diagram viewer
      desktop_Basicflowchart.addListenerOnce("appear", function(e) {
        
        var alldsktpwins = desktop_Basicflowchart.getWindows();

        //Connections
        if (data_Basicflowchart.connections != undefined) {
          for (var k=0; k<data_Basicflowchart.connections.length; k++)
          {
            var defc = data_Basicflowchart.connections[k];
            var eleA = alldsktpwins.find(function(elA) { 
              return elA.getUserData("elementid") == defc.elementA;
            });
            var eleB = alldsktpwins.find(function(elB) {
              return elB.getUserData("elementid") == defc.elementB;
            });
            villeconnect.connect(eleA, eleB, defc.properties, defc.options, desktop_Basicflowchart);
          }
        }
      });

      overviewpage.add(desktop_Basicflowchart);

      // Widget Connect Page
      // Connecting static widgets together
      // Code is taken from https://qooxdoo.org/qxl.demobrowser/#layout~ManualLayout.html

      var wborder = new qx.ui.decoration.Decorator().set({
        width: 3,
        style: "solid",
        color: "black",
      });

      var w1 = new qx.ui.core.Widget().set({
        backgroundColor: "transparent",
        decorator: wborder
      });
      //var w1 = new qx.ui.form.Button("This is a Button");

      w1.setUserData("elementid", 1);
      w1.setUserBounds(100, 100, 100, 100);

      var w2 = new qx.ui.core.Widget().set({
        backgroundColor: "blue",
        decorator: wborder
      });
      w2.setUserData("elementid", 2);
      w2.setUserBounds(460, 100, 100, 100);

      var w3 = new qx.ui.core.Widget().set({
        backgroundColor: "transparent",
        decorator: wborder
      });
      w3.setUserData("elementid", 3);
      w3.setUserBounds(380, 350, 100, 100);

      var w4 = new qx.ui.core.Widget().set({
        backgroundColor: "transparent",
        decorator: wborder
      });
      w4.setUserData("elementid", 4);
      w4.setUserBounds(680, 200, 130, 151);

      var container = new qx.ui.container.Composite();
      container.setUserData("diagramtype", "widgets");

      var wconns = [
        {
          elementA : w1,
          elementB : w2,
          properties : {
            appearance : "connector",
          },
          options : {
            anchorA: "horizontal", 
            anchorB : "horizontal",
            direction : "AtoB"
          }
        },
        {
          elementA : w2,
          elementB : w3,
          properties : {
            appearance : "connector",
          },
          options : {
            anchorA: "vertical",
            anchorB : "vertical",
            direction : "AtoB"
          }
        },
        {
          elementA : w3,
          elementB : w1,
          properties : {
            appearance : "connector",
          },
          options : {
            anchorA: "point",
            anchorB : "point",
            direction : "AtoB"
          }
        },
        {
          elementA : w3,
          elementB : w4,
          properties : {
            appearance : "connector",
          },
          options : {
            anchorA: "point", 
            anchorB : "point",
            direction : "AtoB"
          }
        }
      ];
      

      for (var k=0; k<wconns.length; k++)
      {
        var defc = wconns[k];
        villeconnect.connect(defc.elementA, defc.elementB, defc.properties, defc.options, container);
      }
      
      container.add(w1);
      container.add(w2);
      container.add(w3);
      container.add(w4);

      widgetconnectpage.add(container, { edge: 0 });

      // test - connector widgets
      /*
      var w5 = new qx.ui.core.Widget().set({
        backgroundColor: "gray",
        decorator: conndec,
        padding: 2,
      });
      */

      /*
      var w1b = w1.getBounds();
      var w2b = w2.getBounds();
      var startx = w1b.left + (w1b.width/2);
      var starty = w1b.top + (w1b.height/2);
      var endx = w2b.left - (startx);
      var endy = w2b.top - (starty);
      w5.setUserBounds(startx, starty, endx, endy);
      container.add(w5);
      */

      
 
      // Assemble - THE STACK 
      centerbox.add(dashboardpage);
      centerbox.add(overviewpage);
      centerbox.add(widgetconnectpage);

      // Show the default page
      centerbox.setSelection([widgetconnectpage]);

 

      // *** END of THE STACK ****************************************************
      
      // >>> Populate the Main Menu and Popup Main Menu with content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate westBox with content
      var atmleftnavheader = new qx.ui.basic.Atom("Diagram Editor", "wax/demo/ville_Diagram_logo.png").set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      atmleftnavheader.getChildControl("icon").set({ scale : true });
      westbox.add(atmleftnavheader);
      var tbtndashboardpage = new wax.demo.MenuButton("Network Diagram", "wax/demo/ville_Diagram_logo.svg", true );
      westbox.add(tbtndashboardpage);

      var tbtnSecondPage = new wax.demo.MenuButton("Basic Flowchart", "wax/demo/ville_Diagram_logo.svg", true);
      westbox.add(tbtnSecondPage);

      var tbtnThirdPage = new wax.demo.MenuButton("Widget Connections", "wax/demo/ville_Diagram_logo.svg", true);
      westbox.add(tbtnThirdPage);

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtndashboardpage, tbtnSecondPage, tbtnThirdPage);
      
      // CLONE the above controls
      var atmmenuleftnavheader = atmleftnavheader.clone();
      atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      var tbtnmenudashboardpage = tbtndashboardpage.clone();
      tbtnmenudashboardpage.getChildControl("icon").set({ scale : true });
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      tbtnmenuSecondPage.getChildControl("icon").set({ scale : true });
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      tbtnmenuThirdPage.getChildControl("icon").set({ scale : true });

      // Add the clones to the Main Menu Popup
      mainmenupopup.add(atmmenuleftnavheader);
      mainmenupopup.add(tbtnmenudashboardpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(tbtnmenuThirdPage);


      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenudashboardpage, tbtnmenuSecondPage, tbtnmenuThirdPage);

      // Set default selections
      //centerbox.setSelection([widgetconnectpage]);
      mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
      westboxbuttongroup.setSelection([tbtnThirdPage]);
      atmlogocurrentpage.setLabel("Widget Connections");
      
      //***  CODE for applying popup fading in and out  ***//
      var fadeinleft = {duration: 300, timing: "ease-out", origin: "left top", keyFrames : {
        0: {opacity: 0, left: "-300px"},
        100: {opacity: 1, left: "0px"}
        }};

      mainmenupopup.addListener("appear", function(e) {
        var domtable = mainmenupopup.getContentElement().getDomElement();
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      }, this);

      // *** END of Main Menu and Main Menu Popup *********************************************
    
 


      // *** Wire all the Main Menu Buttons to THE STACK Pages (via Listeners) ****************
      // Turn on all wax.demo.MenuButton listeners
      tbtndashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          mainmenubuttongroup.setSelection([tbtnmenudashboardpage]);
          atmlogocurrentpage.setLabel("Network Diagram");
        }
      }, this);

      tbtnSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
          atmlogocurrentpage.setLabel("Basic Flowchart");
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([widgetconnectpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
          atmlogocurrentpage.setLabel("Widget Connections");
        }
      }, this);

      // Popup menu buttons
      tbtnmenudashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          westboxbuttongroup.setSelection([tbtndashboardpage]);
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          westboxbuttongroup.setSelection([tbtnSecondPage]);
          //dashboardpage.setVisibility("excluded");
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([widgetconnectpage]);
          westboxbuttongroup.setSelection([tbtnThirdPage]);
          //dashboardpage.setVisibility("excluded");
          mainmenupopup.hide();
        }
      }, this);

     



      // *** END of Wiring *************************************************************************

      
      // ====================================
      // =======  MediaQuery code  ========== 
      // ====================================

      var mq1 = new qx.bom.MediaQuery("screen and (min-width: 1024px)");

      mq1.on("change", function(e){
        if(mq1.isMatching() && this.getDemoMode()=="desktop"){
          scrollwest.setVisibility("visible"); 
          mainmenupart.setVisibility("excluded");
          atmlogocurrentpage.setVisibility("hidden");
        }
        else {
          scrollwest.addListener("appear", function(e) {
            var domtable = scrollwest.getContentElement().getDomElement();
            qx.bom.element.Animation.animate(domtable, fadeinleft);
          }, this); 
          scrollwest.setVisibility("excluded");
          atmlogocurrentpage.setVisibility("visible");
          if (this.getDemoMode() == "desktop")
            mainmenupart.setVisibility("visible");
        }
      }, this);
      if (mq1.isMatching()) {
        scrollwest.setVisibility("visible"); 
        mainmenupart.setVisibility("excluded");
        atmlogocurrentpage.setVisibility("hidden");
      }
      else {
        scrollwest.addListener("appear", function(e) {
          var domtable = scrollwest.getContentElement().getDomElement();
          qx.bom.element.Animation.animate(domtable, fadeinleft);
        }, this); 
        scrollwest.setVisibility("excluded"); 
        mainmenupart.setVisibility("visible");
        atmlogocurrentpage.setVisibility("visible");
      }

      var mq2 = new qx.bom.MediaQuery("screen and (min-width: 767px)");

      mq2.on("change", function(e){
        if(mq2.isMatching()){}
        else {}
      });

      if (mq2.isMatching()) {}
      else {}

    },


    __createDetailWindow : function()
    {
      // Create the Window
      var win = new qx.ui.window.Window("Detail Window").set({ appearance: "wax-window", allowMaximize : true, allowMinimize : false, modal: true, movable: true });
      win.setLayout(new qx.ui.layout.VBox(4));
      win.setShowStatusbar(true);
      win.setStatus("Generic Message"); 
      win.getChildControl("title").set({padding: [10,0,0,10]});

      return win;
    }
  }
});
