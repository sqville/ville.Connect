/* ************************************************************************

   Copyright: sqville 2021

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * @asset(ville/connect/baseline-expand_more-24px.svg)
 * @asset(ville/connect/baseline-expand_less-24px.svg)
 */

qx.Theme.define("ville.connect.Decoration",
{
  decorations :
  {
    "chevron-down" :
    {      
      style :
      {
        backgroundImage: "wax/demo/info-24px.svg",
        backgroundRepeat: "repeat",
        backgroundPositionX: "middle",
        backgroundPositionY: "center",
        backgroundColor : "green"
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
    }
    
  }
});