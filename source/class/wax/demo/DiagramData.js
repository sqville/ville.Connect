qx.Class.define("wax.demo.DiagramData",
{
  extend : qx.core.Object,

  statics :
  {
    DIAGRAMS : {
      BasicFlowchart : {
        "elements" : [
          {
            id : 1,
            left : 400,
            top : 50,
            properties : {},
            options : {
              content : 'Start',
              shape : "circle-pill"
            }
          },
          {
            id : 2,
            left : 400,
            top : 200,
            properties : {},
            options : {
              content : 'Step 1',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 3,
            left : 393,
            top : 355,
            properties : {},
            options : {
              content : 'Decision',
              shape : "diamond"
            }
          },
          {
            id : 4,
            left : 600,
            top : 385,
            properties : {},
            options : {
              content : 'Step 2',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 5,
            left : 400,
            top : 550,
            properties : {},
            options : {
              content : 'End',
              shape : "circle-pill"
            }
          },
          {
            id : 6,
            left : 800,
            top : 500,
            properties : {visibility: "hidden"},
            options : {
              content : 'label',
              shape : "square-rectangle-sharp"
            }
          }
        ],
        "connections" : [
          {
            elementA : 1,
            elementB : 2,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical", 
              anchorAposition: "center-bottom",
              anchorBposition: "center",
              anchorBoffsetTop: 10,
              direction : "AtoB"
            }
          },
          {
            elementA : 2,
            elementB : 3,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical",
              direction : "AtoB"
            }
          },
          {
            elementA : 3,
            elementB : 4,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "horizontal", 
              anchorB : "horizontal",
              direction : "AtoB"
            }
          },
          {
            elementA : 4,
            elementB : 2,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "horizontal",
              direction : "AtoB"
            }
          },
          {
            elementA : 3,
            elementB : 5,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical",
              direction : "AtoB"
            }
          }
        ]
      },
      NetworkDiagram : {
            "elements" : [
              {
                id : 1,
                left : 70,
                top : 70,
                properties : {backgroundColor: "transparent"},
                options : {
                  content : 'Server',
                  image : "wax/demo/server_01.png"
                }
              },            
              {
                id : 2,
                left : 200,
                top : 250,
                properties : {},
                options : {
                  content : "6 Port Switch",
                  image : "wax/demo/switch_01.png"
                }
              },
              {
                id : 3,
                left : 400,
                top : 70,
                properties : {},
                options : {
                  content : "Router",
                  image : "wax/demo/router_01.png"
                }
              },
              {
                id : 4,
                left : 690,
                top : 100,
                properties : {},
                options : {
                  content : "ISP",
                  image : "wax/demo/isp_01.png"
                }
              },
              {
                id : 5,
                left : 950,
                top : 70,
                properties : {},
                options : {
                  content : "Cloud",
                  image : "wax/demo/cloud_01.png"
                }
              },
              {
                id : 6,
                left : 70,
                top : 470,
                properties : {},
                options : {
                  content : "Printer",
                  image : "wax/demo/printer_01.png"
                }
              },
              {
                id : 7,
                left : 320,
                top : 470,
                properties : {},
                options : {
                  content : "Workstation",
                  image : "wax/demo/computer_01.png"
                }
              },
              {
                id : 8,
                left : 570,
                top : 470,
                properties : {},
                options : {
                  content : "Workstation",
                  image : "wax/demo/computer_01.png"
                }
              },
              {
                id : 9,
                left : 700,
                top : 400,
                properties : {visibility: "hidden"},
                options : {
                  content : "<b>A simple network diagram</b>"
                }
              }
            ],
            "connections" : [
                {
                  elementA : 1,
                  elementB : 2,
                  properties : {
                    backgroundColor : "gray",
                    decorator : "roundedcorners-light"
                  },
                  options : {
                    anchorA: "point", 
                    anchorB : "point"
                  }
                },
                {
                  elementA : 3,
                  elementB : 2,
                  properties : {
                    backgroundColor : "gray",
                    decorator : "roundedcorners-light"
                  },
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 3,
                  elementB : 4,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "horizontal"
                  }
                },
                {
                  elementA : 4,
                  elementB : 5,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "horizontal"
                  }
                },
                {
                  elementA : 2,
                  elementB : 6,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 2,
                  elementB : 7,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 2,
                  elementB : 8,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                }
            ]
        }
    }
  }
});