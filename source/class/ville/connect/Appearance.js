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
        backgroundColor : "#FF00FF",
        padding : 0,
        zIndex: 9
       };
     }
   }
  }
});