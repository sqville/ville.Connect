/* ************************************************************************

   Copyright: sqville 2021

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * @asset(ville/connect/baseline-expand_more-24px.svg)
 * @asset(ville/connect/baseline-expand_less-24px.svg)
 * @asset(wax/demo/info-24px.svg)
 */

qx.Theme.define("ville.connect.Decoration",
{
  decorations :
  {
    "connector-start" :
    {      
      style :
      {
        radius : 50,
        color : "#FF00FF",
        width : 6
      }
    },

    "connector-solid" :
    {      
      include : "connector-start",
      
      style :
      {
        width : 3,
        style : "solid"
      }
    },

    "connector-dashed-large" :
    {      
      include : "connector-start",
      
      style :
      {
        style : "dashed",
        width : 6
      }
    },

    "connector-dashed-small" :
    {      
      include : "connector-start",
      
      style :
      {
        style : "dashed",
        width : 3
      }
    },

    "roundedcorners-light" :
    {      
      style :
      {
        radius : 50
      }
    },
    
    "arrow-right" :
    {      
      style :
      {
        color : ["transparent",null,"transparent","gray"],
        style : ["solid",null,"solid","solid"],
        width : [8.5,0,8.5,8]
      }
    },

    "dark-arrow-right" :
    {
      style :
      {
        color : ["transparent",null,"transparent", "black"],
        style : ["solid",null,"solid","solid"],
        width : [10.5,0,10.5,24]
      }
    },

    "dark-arrow-up" :
    {
      style :
      {
        color : [null,"transparent","black","transparent"],
        style : [null,"solid","solid","solid"],
        width : [0,10.5,24,10.5]
      }
    },

    "dark-arrow-down" :
    {
      style :
      {
        color : ["black","transparent",null,"transparent"],
        style : ["solid", "solid",null,"solid"],
        width : [24,10.5,0,10.5]
      }
    },

    "dark-arrow-left" :
    {
      style :
      {
        color : ["transparent","black","transparent",null],
        style : ["solid","solid","solid",null],
        width : [10.5,24,10.5,0]
      }
    },

    "clippy-arrow-left" :
    {
      style :
      {
        backgroundColor : "#FF00FF",
        clipPath: "polygon(50% 100%, 70% 100%, 40% 50%, 70% 0, 50% 0, 20% 50%)"
      }
    },

    "clippy-arrow-right" :
    {
      style :
      {
        backgroundColor : "#FF00FF",
        clipPath: "polygon(50% 100%, 30% 100%, 60% 50%, 30% 0, 50% 0, 80% 50%)"
      }
    },

    "clippy-arrow-up" :
    {
      style :
      {
        backgroundColor : "#FF00FF",
        clipPath: "polygon(100% 60%, 100% 80%, 50% 40%, 0 80%, 0 60%, 50% 20%)"
      }
    },

    "clippy-arrow-down" :
    {
      style :
      {
        backgroundColor : "#FF00FF",
        clipPath: "polygon(100% 40%, 100% 20%, 50% 60%, 0 20%, 0 40%, 50% 80%)"
      }
    }

    
  }
});