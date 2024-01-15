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
        backgroundColor : "gray",
        padding : 0,
        decorator : "connector-blank"
       };
     }
   }
  }
});