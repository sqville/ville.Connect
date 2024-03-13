<!-- ABOUT THE PROJECT -->
## ville.Connect

**ville.Connect** is a [Qooxdoo](https://qooxdoo.org/) control designed to visually connect widgets on a canvas type layout.

## The Big Idea
Create a diagram/workflow/mindmap, tool/widget/capability using 100% Qooxdoo code and objects. No SVG or Canvas HTML tags, if at all possible.

<!-- DEMOS -->
## Demos

[Demo](https://sqville.github.io/ville.Connect/published/)
* Right click any connector to edit it's properties
* Move or resize connected widgets to see the connection dyanmically adjust (only enabled for first two examples. The third example are static ui widgets.)

<!-- Defining a connection -->
## Define a connection object

Example of two ui objects connected by a single connector:
```javascript
"connections" : [
  {
    elementA : widget1,
    elementB : widget2,
    properties : {
      appearance : "connector",
      decorator : "connector-solid"
    },
    options : {
      anchorA: "horizontal",  
      anchorAposition: "center-top",
      anchorB : "horizontal",
      anchorBposition: "center",
      anchorAoffsetTop: 10,
      anchorAoffsetLeft: 10,
      anchorBoffsetTop: 10,
      anchorBoffsetLeft: 10,
      strokeWidth: 8,
      startArrow: "dark-arrow",
      startArrowsize: 32,
      endArrow: "dark-arrow",
      endArrowsize: 32
    }
  }
]
```

<!-- ROADMAP -->
## Roadmap

* Create simple scenarios and connection types. (Completed)
* Create and modify simple scenarios and connection types with the ability to export changes to a single json object. (In progress)
* Add shapes and connections using a UI - i.e. drag and drop. (Not started)
* Interop with other formats/tools - i.e. Excalidraw, draw.io, Lucidcharts. (Not started)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Chris Eskew - email: sqville@gmail.com

## Attribution
Inspired by and learned from this project: [jqSimpleConnect](https://github.com/jfmdev/jqSimpleConnect)