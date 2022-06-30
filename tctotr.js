document.addEventListener("DOMContentLoaded", function(event) {
      const TRTCSelect = document.querySelector("#TRTCSelect");
      const tctotr = document.querySelector(".tctotr");
      const trtotc = document.querySelector(".trtotc");
      const result = document.querySelector('#result');
      const allinput = document.querySelectorAll("input");
      const unitresult = document.querySelector('#unitresult');
      const method = document.querySelector('#method');
      trtotc.style.display = 'none';
      result.input='';
      document.querySelector('#Results').classList.remove('unhidden');
      
      TRTCSelect.addEventListener('change', function(){
        allinput.forEach(input => {
          input.value = '';
        });
        document.querySelector('#Results').classList.remove('unhidden');
        
        if(this.value == 1){
          tctotr.style.display = 'none';
          trtotc.style.display = 'table-row';
          method.innerHTML = '<em>k</em> = Thermal Conductivity';
          unitresult.innerHTML = 'W/m•K';
        }else{
          trtotc.style.display = 'none';
          tctotr.style.display = 'table-row';
          unitresult.innerHTML = 'm<sup>2</sup>K/W';
          method.innerHTML = '<em>R</em> = Thermal Resistance';
        }
      });
});
jQuery(document).ready(function() {

jQuery('#mselDB').click(openDB);


});

function openDB() {
    var xin = '../materials-database-popup/'
    window.addEventListener('message', function(event) {
        var receivedArray = event.data;
        document.getElementById("tcinput").value = parseFloat(receivedArray[1]);
    });
    newwin(xin, 'databasepopup',"mselDB")
 }

function newwin(file, window, varp) {
 childWindow = open(file, window, 'resizable=no,toolbar=no,location=no,status=no,menubar=no,directories=no,width=850,height=600');
 // childWindow.setAttribute('id', 'win' + varp)
 if (childWindow.opener == null) childWindow.opener = self;
 return true;
}

function Calculate(x, y, z) {  //choice, thickness value, unit //
        var tc = document.getElementById("tcinput").value;
        var tr = document.getElementById("trinput").value;

        if ((tc!="" || tr!="") && (x != "" || y != "" || z !="")){
            var thick;
            switch (z){
                case 'mm': thick = y/1000;
                break;
                case 'cm': thick = y/100;
                break;
                case 'in': thick = y * 0.0254;
                break;
            }
            var result;


            switch(x){
                case '0': result = tctotr(thick, tc);
                document.getElementById('result').value = (result).toFixed(5);
                break;
                case '1': result = trtotc(thick, tr);
                document.getElementById('result').value = (result).toFixed(3);
                break;
            }

			
            
            document.querySelector('#Results').classList.add('unhidden');

        }
    }
    function tctotr(thick, tc){ /*ThermalConductivityToThermalResistance*/
      return (thick / tc);
    }

    function trtotc(thick, tr){ /* ThermalResistanceToThermalConductivity*/
      var trunit = document.getElementById("trunit").value;
        if(trunit == "hfft2FBtu"){
            tr = tr/5.678;
        }
        return (thick / tr);
    }