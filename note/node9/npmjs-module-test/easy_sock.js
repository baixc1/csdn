const EasySock = require('easy_sock');

function createSocket(){
  var easysock = new EasySock();
  easysock.setConfig({
      ip : "127.0.0.1",
      port : 4000,	
      keepAlive : false,	
      timeout : 50	//0 by default
  });
  
  //check if the package is received complete
  easysock.isReceiveComplete = function(packet){		
      var len = 0;	
      //your code here..

      console.log(packet)
      console.log('isReceiveComplete')
      
      /* 
      * Check if the package is received complete. If not, return 0.
      * Otherwise return length of the FIRST complete package.
      * If the buffer contains more than one package--it usually happens when package size is small--, 
      * just return the size of first one(not total).
      */
      return len;
  };
  
  //encode the data to binary 
  easysock.encode = function(data, seq){
      var packet = new Buffer(100);
      packet.writeInt32BE(seq, 0);
      //your code here..

      console.log('encode')
      console.log(seq)
      //Translate the "data"(usually is a json or string) into a Buffer, and return the Buffer
      return packet;		
  };
  
  //decode the buffer
  easysock.decode = function(packet){
    console.log('decode')
    console.log(packet)
      //The packet is a Buffer with a complete response. So decode the buffer to other type of data.
      var seq = packet.readInt32BE(0);
      //do sth else
      //must return the result and seq
      return {
          result : {},
          seq : seq
      };
      
  };
  return easysock;
}

var client = createSocket();

client.write({
      key : ""
  }, 
  function(err, data){
      if (err){
          //err is a string
          console.log("fail:" + err);
      }
      else{
          console.log("success");
          console.dir(data);
      }
  }
);