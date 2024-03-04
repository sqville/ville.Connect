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
            left : 300,
            top : 10,
            properties : {},
            options : {
              content : 'Start',
              shape : "circle-pill"
            }
          },
          {
            id : 2,
            left : 300,
            top : 110,
            properties : {},
            options : {
              content : 'Step 1',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 3,
            left : 293,
            top : 240,
            properties : {},
            options : {
              content : 'Decision',
              shape : "diamond"
            }
          },
          {
            id : 4,
            left : 500,
            top : 290,
            properties : {},
            options : {
              content : 'Step 2',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 5,
            left : 300,
            top : 430,
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
            properties : {backgroundColor : "transparent"},
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
            properties : {backgroundColor : "transparent"},
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
            properties : {backgroundColor : "transparent"},
            options : {
              anchorA: "vertical", 
              anchorB : "horizontal",
              direction : "AtoB"
            }
          },
          {
            elementA : 3,
            elementB : 5,
            properties : {backgroundColor : "transparent"},
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
                left : 10,
                top : 40,
                properties : {backgroundColor: "transparent"},
                options : {
                  content : 'Server',
                  image : "wax/demo/server_01.png"
                }
              },            
              {
                id : 2,
                left : 150,
                top : 200,
                properties : {},
                options : {
                  content : "6 Port Switch",
                  image : "wax/demo/switch_01.png"
                }
              },
              {
                id : 3,
                left : 300,
                top : 50,
                properties : {},
                options : {
                  content : "Router",
                  image : "wax/demo/router_01.png"
                }
              },
              {
                id : 4,
                left : 500,
                top : 150,
                properties : {},
                options : {
                  content : "ISP",
                  image : "wax/demo/isp_01.png"
                }
              },
              {
                id : 5,
                left : 700,
                top : 70,
                properties : {},
                options : {
                  content : "Cloud",
                  image : "wax/demo/cloud_01.png"
                }
              },
              {
                id : 6,
                left : 50,
                top : 370,
                properties : {},
                options : {
                  content : "Printer",
                  image : "wax/demo/printer_01.png"
                }
              },
              {
                id : 7,
                left : 270,
                top : 370,
                properties : {},
                options : {
                  content : "Workstation",
                  image : "wax/demo/computer_01.png"
                }
              },
              {
                id : 8,
                left : 520,
                top : 370,
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
                    appearance : "connector"
                  },
                  options : {
                    anchorA: "vertical", 
                    anchorB : "horizontal",
                    anchorAposition: "center-bottom",
                    anchorBposition: "left-middle",
                    strokeWidth: 0
                  }
                },
                {
                  elementA : 3,
                  elementB : 2,
                  properties : {
                    appearance : "connector"
                  },
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "vertical",
                    anchorAposition: "left-middle",
                    strokeWidth: 8
                  }
                },
                {
                  elementA : 3,
                  elementB : 4,
                  properties : {appearance : "connector"},
                  options : {
                    anchorA: "point", 
                    anchorB : "point",
                    anchorAposition: "right-middle",
                    anchorBposition: "left-middle",
                    endArrow: "clippy-arrow"
                  }
                },
                {
                  elementA : 4,
                  elementB : 5,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "horizontal",
                    anchorAposition: "right-middle",
                    anchorBposition: "left-middle"
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