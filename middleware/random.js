/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/
const generatedId = (type)=>{

 var i;
 var key = "";
 var characters = "abcdeLVOghe930kdFHGMLOE583WQ85fhueokaqxXPOLfr90ODUEDfe394vbkfghjkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123BHGUQatupvXKIRLWghurta456789ghidAJKIO34UNGNnJsuourAQP094MKBVLODIu3u48gnndFHUETBCLOP01AvbhyeLopqmkcjdeYG399DMNEfhoemsoer034dfn0rynQWO340n984nbhusPXZYw5rv93mdcoL0QOdhcmlaTHYPVNX28dshgcbeSDVPOLWQcbu93dmawrtoumb";

 var charactersLength = characters.length;

 if(type === 'guid') {
   for ( var i = 0; i < 40; i++ ) {
     key += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return key;
 }


 else if(type === 'gpid'){
   for ( var i = 0; i < 30; i++ ) {
     key += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
   return key;
 }

 else if(type === 'token'){
  for ( var i = 0; i < 98; i++ ) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return key;
}
 else return null;
}

module.exports = { generatedId }