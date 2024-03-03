/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("ville.connect.Appearance",
{
  appearances :
  {
   "connector" :
   {
    include : "widget", 
    
    style : function(states)
     {
      return {
        backgroundColor : "transparent",
        padding : 0,
        decorator : "connector-dashed",
        zIndex: 9
       };
     }
   }
  }
});