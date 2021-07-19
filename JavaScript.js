  // Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('#myForm');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
    
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getAllData();
  };      
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    closeformbiodata();
    LockData();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
    
  //GET ALL DATA
  function getAllData(){
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
    
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' id='datatablesiswa' style='font-size:12px; border; 1px;'>"+
                   "<thead style='white-space: wrap; color: red; display: none;'>"+
                     "<tr>"+ 
                      "<th scope='col' style='display:none'>Delete</th>"+
                      "<th scope='col'>PILIH</th>"+
                      "<th scope='col' style='display:none'>KEY</th>"+
                      "<th scope='col'>USERNAME</th>"+
                      "<th scope='col' style='display:none'>PASSWORD</th>"+
                      "<th scope='col'>TEMPAT LAHIR</th>"+
                      "<th scope='col'>TGL LAHIR</th>"+
                      "<th scope='col' style='display:none'>INDUK</th>"+
                      "<th scope='col' style='display:none'>NISN</th>"+
                      "<th scope='col' style='display:none'>NIK</th>"+
                      "<th scope='col' style='display:none'>AGAMA</th>"+
                      "<th scope='col' style='display:none'>JK</th>"+
                      "<th scope='col' style='display:none'>NIK</th>"+
                      "<th scope='col' style='display:none'>NO KK</th>"+
                      "<th scope='col' style='display:none'>NAMA BAPAK</th>"+
                      "<th scope='col' style='display:none'>NAMA IBU</th>"+
                      "<th scope='col' style='display:none'>NAMA WALI</th>"+
                      "<th scope='col' style='display:none'>NO REG AKTE</th>"+
                      "<th scope='col' style='display:none'>NO TELP</th>"+
                      "<th scope='col' style='display:none'>ALAMAT</th>"+
                      "<th scope='col' style='display:none'>RT</th>"+
                      "<th scope='col' style='display:none'>RW</th>"+
                      "<th scope='col' style='display:none'>KELURAHAN</th>"+
                      "<th scope='col' style='display:none'>KECAMATAN</th>"+
                      "<th scope='col' style='display:none'>PEKERJAAN BAPAK</th>"+
                      "<th scope='col' style='display:none'>GAJI BAPAK</th>"+
                      "<th scope='col' style='display:none'>PENDIDIKAN BAPAK</th>"+
                      "<th scope='col' style='display:none'>NIK BAPAK</th>"+
                      "<th scope='col' style='display:none'>PEKERJAAN IBU</th>"+
                      "<th scope='col' style='display:none'>GAJI IBU</th>"+
                      "<th scope='col' style='display:none'>PENDIDIKAN IBU</th>"+
                      "<th scope='col' style='display:none'>NIK IBU</th>"+
                      "<th scope='col' style='display:none'>TINGGI BADAN</th>"+
                      "<th scope='col' style='display:none'>BERAT BADAN</th>"+
                      "<th scope='col' style='display:none'>CITA-CITA</th>"+
                      "<th scope='col' style='display:none'>HOBBY</th>"+
                      "<th scope='col' style='display:none'>EKSKUL</th>"+
                      "<th scope='col' style='display:none'>BSM</th>"+
                      "<th scope='col' style='display:none'>PRES1_1</th>"+
                      "<th scope='col' style='display:none'>PRES1_2</th>"+
                      "<th scope='col' style='display:none'>PRES1_3</th>"+
                      "<th scope='col' style='display:none'>PRES1_4</th>"+
                      "<th scope='col' style='display:none'>PRES1_5</th>"+
                      "<th scope='col' style='display:none'>PRES2_1</th>"+
                      "<th scope='col' style='display:none'>PRES2_2</th>"+
                      "<th scope='col' style='display:none'>PRES2_3</th>"+
                      "<th scope='col' style='display:none'>PRES2_4</th>"+
                      "<th scope='col' style='display:none'>PRES2_5</th>"+
                      "<th scope='col' style='display:none'>KELAS</th>"+
                      "<th scope='col' style='display:none'>AVRfoto</th>"+
                      "<th scope='col' style='display:none'>FOTOPROFIL</th>"+
                      "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' style='display:none'>Delete</button></td>";
          result += "<td><button type='button' style='background-color: transparent; color:#7CFC00; border-color:transparent;font-size: 20px;cursor:pointer;' onclick='editData(this);passwordlogin();pastekey();'><i class='fas fa-check-circle'></i> OK</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data Tidak Ditemukan";
    }
  }

  //DELETE DATA
  function deleteData(el) {
  var result = confirm("Ingin Menghapus?");
  if (result) {
  var recordId = el.parentNode.parentNode.cells[2].innerHTML;
  google.script.run.withSuccessHandler(createTable).deleteData(recordId);
  }
  }
    
  //EDIT DATA
  function editData(el){
  var recordId = el.parentNode.parentNode.cells[2].innerHTML;
  google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  passwordlogin();
  pastekey();
  }

  //POPULATE FORM
  function populateForm(records){
  document.getElementById('KEY').value = records[0][0];
  document.getElementById('USERNAME').value = records[0][1];
  document.getElementById('PASSWORD').value = records[0][2];
  document.getElementById('TEMPAT_LAHIR').value = records[0][3];
  document.getElementById('TGL_LAHIR').value = records[0][4];
  document.getElementById('INDUK').value = records[0][5];
  document.getElementById('NISN').value = records[0][6];
  document.getElementById('NIK').value = records[0][7];
  document.getElementById('AGAMA').value = records[0][8];
  document.getElementById('JK').value = records[0][9];
  document.getElementById('NO_KK').value = records[0][10];
  document.getElementById('NAMA_BAPAK').value = records[0][11];
  document.getElementById('NAMA_IBU').value = records[0][12];
  document.getElementById('NAMA_WALI').value = records[0][13];
  document.getElementById('NO_REG_AKTE').value = records[0][14];
  document.getElementById('NO_TELP').value = records[0][15];
  document.getElementById('ALAMAT').value = records[0][16];
  document.getElementById('RT').value = records[0][17];
  document.getElementById('RW').value = records[0][18];
  document.getElementById('KEL').value = records[0][19];
  document.getElementById('KEC').value = records[0][20];
  document.getElementById('PEKERJAAN_BAPAK').value = records[0][21];
  document.getElementById('GAJI_BAPAK').value = records[0][22];
  document.getElementById('PEND_BAPAK').value = records[0][23];
  document.getElementById('NIK_BAPAK').value = records[0][24];
  document.getElementById('PEKERJAAN_IBU').value = records[0][25];
  document.getElementById('GAJI_IBU').value = records[0][26];
  document.getElementById('PEND_IBU').value = records[0][27];
  document.getElementById('NIK_IBU').value = records[0][28];
  document.getElementById('TINGGI_BADAN').value = records[0][29];
  document.getElementById('BERAT_BADAN').value = records[0][30];
  document.getElementById('CITA_CITA').value = records[0][31];
  document.getElementById('HOBBY').value = records[0][32];
  document.getElementById('EKSKUL').value = records[0][33];
  document.getElementById('BSM').value = records[0][34];
  document.getElementById('PRES1_1').value = records[0][35];
  document.getElementById('PRES1_2').value = records[0][36];
  document.getElementById('PRES1_3').value = records[0][37];
  document.getElementById('PRES1_4').value = records[0][38];
  document.getElementById('PRES1_5').value = records[0][39];
  document.getElementById('PRES2_1').value = records[0][40];
  document.getElementById('PRES2_2').value = records[0][41];
  document.getElementById('PRES2_3').value = records[0][42];
  document.getElementById('PRES2_4').value = records[0][43];
  document.getElementById('PRES2_5').value = records[0][44];
  document.getElementById('KLSS').value = records[0][45];
  document.getElementById('AVRfoto').value = records[0][46];
  document.getElementById('FOTOPROFIL').value = records[0][47];
  document.getElementById('message').innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }

function LoginUser()
{
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("btnlogin").style.display = "none";
document.getElementById("errorMessage").innerHTML = "<i class='fa fa-refresh fa-spin'></i> Tunggu Sebentar";
google.script.run.withSuccessHandler(function(output) 
{
if(output == 'TRUE')
{
document.getElementById("errorMessage").innerHTML = "Password Berhasil";
document.getElementById("loginDisplay").style.display = "none";
document.getElementById("MenuSideDiv").style.display = "block";
paste();
}
else if(output == 'FALSE')
{
document.getElementById("errorMessage").innerHTML = "Password salah ulangi masukan Password dengan benar";
document.getElementById("btnlogin").style.display = "block";
}    
}).checkLogin(username, password);
}

function Getusername(kelas) 
{
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("usernames").style.display = "none";
document.getElementById("passwordlogin").style.display = "none";
google.script.run.withSuccessHandler(function(ar) 
{
console.log(ar);
username.length = 0;
let option = document.createElement("option");
option.value = "";
option.text = "";
document.getElementById("usernames").style.display = "none";
username.appendChild(option);
ar.forEach(function(item, index) 
{    
let option = document.createElement("option");
option.value = item;
option.text = item;
document.getElementById("usernames").style.display = "block";
username.appendChild(option);    
});
}).getusernames(kelas);
};

function Getuserkey(name) 
{
google.script.run.withSuccessHandler(function(ar) 
{
console.log(ar);
userkey.length = 0;
ar.forEach(function(value) 
{ 
let option = document.createElement("input");
option.type = "text";
option.name = "idkeyuser";
option.id = "idkeyuser";
option.value = value;
userkey.appendChild(option);
filterFunction();
});
}).getuserkey(name);
};

function clearidkey() {
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("idkeyuser").remove();
document.getElementById("userkey").innerHTML="";
}

function resizable (el, factor) {
var int = Number(factor) || 7.7;
function resize() {el.style.width = ((el.value.length+1) * int) + 'px'}
var e = 'keyup,keypress,focus,blur,change'.split(',');
for (var i in e) el.addEventListener(e[i],resize,false);
resize();
}
resizable(document.getElementById('upload-Preview'),7);


  function filterFunction() {
  document.getElementById('dataverifikasi').style.display = 'none';
  document.getElementById("errorMessage").innerHTML = "";
  var x = document.getElementById("idkeyuser").value;
  var input, filter, table, tr, td, txtValue;
  input = document.getElementById('idkeyuser');
  filter = input.value.toUpperCase();
  table = document.getElementById('datatablesiswa');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
        document.getElementById("dataverifikasi").style.display = "block";
        document.getElementById("passwordlogin").style.display = "none";
        document.getElementById('btnlogin').style.display = 'block'
      }
    }      
  }
  }

function passwordlogin() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0;
document.getElementById("passwordlogin").style.display = "block";
document.getElementById("dataverifikasi").style.display = "none";
}
function formbiodata() {
closeall();
document.getElementById("Formbiodata").style.display = "block";
}
function closeformbiodata() {
closeall();
document.getElementById("menuline").style.display = "block";
}
function formsetting() {
closeall();
document.getElementById("Formbiodata").style.display = "block";
document.getElementById("hiddenbiosiswa").style.display = "none";
document.getElementById("Setting").style.display = "block";
}

function closeall() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0;
document.getElementById("passwordlogin").style.display = "none";
document.getElementById("dataverifikasi").style.display = "none";
document.getElementById("menuline").style.display = "none";
document.getElementById("Formbiodata").style.display = "none";
document.getElementById("Setting").style.display = "none";
document.getElementById("hiddenbiosiswa").style.display = "block";
}

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
  closeformbiodata();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var fileReader = new FileReader();
var filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

fileReader.onload = function (event) {
  var image = new Image();
  
  image.onload=function(){
      document.getElementById("original-Img").src=image.src;
      var canvas=document.createElement("canvas");
      var context=canvas.getContext("2d");
      canvas.width= 100;
      canvas.height=100;
      context.drawImage(image,0, 0, canvas.width, canvas.height);
      document.getElementById("upload-Preview").src = canvas.toDataURL();
  }
  image.src=event.target.result;
};

var loadImageFile = function () {
  var uploadImage = document.getElementById("file1");
  
  //check and retuns the length of uploded file.
  if (uploadImage.files.length === 0) { 
    return; 
  }
  
  //Is Used for validate a valid file.
  var uploadFile = document.getElementById("file1").files[0];
  if (!filterType.test(uploadFile.type)) {
    alert("Please select a valid image."); 
    return;
  }
  
  fileReader.readAsDataURL(uploadFile);
}

  //GET ALL DATA CHAT
  function getAllDatacHAT(){
  document.getElementById("loaddingchat").style.display = "block";
  google.script.run.withSuccessHandler(createTablecHAT).getAllDataChat();
  BottomFunction();
  scrolltextchat();
  }
    //CREATE THE DATA TABLE
  function createTablecHAT(dataArray) {
    if(dataArray){
      var result = "<div class='table table-sm' id='datatablesiswacHAT' style='margin-bottom:20px; font-size:12px; border; 1px;background-color:white; width:100%; background-color: transparent;'>";

      for(var i=0; i<dataArray.length; i++) {
          result += "<div class='chatboxtab'>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<div class='chatbox'>"+dataArray[i][j]+"</div>";
          }
          result += "</div>";
      }
      result += "</div>";
      var div = document.getElementById('dataTablecHAT');
      div.innerHTML = result;
      document.getElementById("loaddingchat").style.display = "none";
    }else{
      var div = document.getElementById('dataTablecHAT');
      div.innerHTML = "Chat Tidak Ada!";
      document.getElementById("loaddingchat").style.display = "none";
    }
    }

function TERANG() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color:white;}"+"</style>";
pastethemes();
}
function GELAP() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color:black;}"+"</style>";
pastethemes();
}
function Marigold() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #FDAC53;}"+"</style>";
pastethemes();
}
function Cerulean() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #9BB7D4;}"+"</style>";
pastethemes();
}
function Rust() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #5B55A30;}"+"</style>";
pastethemes();
}
function Illuminating() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #F5DF4D;}"+"</style>";
pastethemes();
}
function FrenchBlue() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #0072B5;}"+"</style>";
pastethemes();
}
function GreenAsh() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #A0DAA9;}"+"</style>";
pastethemes();
}
function BurntCoral() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #E9897E;}"+"</style>";
pastethemes();
}
function Mint() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #00A170;}"+"</style>";
pastethemes();
}
function Orchid() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #926AA6;}"+"</style>";
pastethemes();
}
function Sorbet() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #D2386C;}"+"</style>";
pastethemes();
}
function Inkwell() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #363945;}"+"</style>";
pastethemes();
}
function Buttercream() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #EFE1CE;}"+"</style>";
pastethemes();
}
function Desert() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #E0B589;}"+"</style>";
pastethemes();
}
function Willow() {
document.getElementById("stylebcg").value = "";
document.getElementById("stylebcg").value = "<style>"+"body {background-color: #9A8B4F;}"+"</style>";
pastethemes();
}

function ThemeBlack() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03.png');}"+
".mkb-blue .mkb-blue label {color: white;}"+
".mkb-blue input {color: black;}"+
".mkb-blue .mkb-button {border-color: black; background-color: white; color: black;}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: black; color: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: black; background-color: rgb(0, 0, 0, 0.8);color: white;}"+
"</style>";
pastethemes();
}

function ThemeRed() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03_RED.png');}"+
".mkb-blue label {color: white;}"+
".mkb-blue input {color: red;}"+
".mkb-blue .mkb-button {border-color: red; background-color: white; color: red;}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: red; color: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: red; background-color: rgb(178, 34, 34, 0.8); color: white;}"+
"</style>";
pastethemes();
}

function ThemeGreen() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03_GREEN.png');}"+
".mkb-blue label {color: white;}"+
".mkb-blue input {color: green;}"+
".mkb-blue .mkb-button {border-color: green; background-color: white; color: green;}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: green; color: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: green; background-color: rgb(34, 139, 34, 0.8); color: white;}"+
"</style>";
pastethemes();
}

function ThemeBlue() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03_BLUE.png');}"+
".mkb-blue label {color: white;}"+
".mkb-blue input {color: blue;}"+
".mkb-blue .mkb-button {border-color: blue; background-color: white; color: blue;}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: blue; color: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: blue; background-color: rgb(0, 0, 179, 0.7); color: white;}"+
"</style>";
pastethemes();
}

function ThemeIndigo() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03_PURPLE.png');}"+
".mkb-blue label {color: white;}"+
".mkb-blue input {color: indigo;}"+
".mkb-blue .mkb-button {border-color: indigo; background-color: white; color: indigo;}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: indigo; color: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: indigo; background-color: rgb(75, 0, 130, 0.8); color: white;}"+
"</style>";
pastethemes();
}

function ThemeMidnightBlue() {
document.getElementById("stylethemes").value = "";
document.getElementById("stylethemes").value = "<style>"+
"body {background-image:url('//a0ce76b8-a-62cb3a1a-s-sites.googlegroups.com/site/databloggerjp05/home/folder-img/BCGREPEAT_03_PURPLE.png');}"+
".mkb-blue label {color: white;}"+
".mkb-blue input {color: rgb(25, 25, 112);}"+
".mkb-blue .mkb-button {border-color: rgb(25, 25, 112);background-color: white; color: rgb(25, 25, 112);}"+
".w3-bar, .sidenav, .mkb-blue .mkb-button:hover {background-color: rgb(25, 25, 112); color;: white;}"+
".textpin, #home h3, .mkb-blue .mkb-form-group {border-color: rgb(25, 25, 112); background-color: rgb(25, 25, 112, 0.8); color: white;}"+
"</style>";
pastethemes();
}

function pastethemes() {
EditData();
document.getElementById('FOTOPROFIL').value = "";
document.getElementById('FOTOPROFIL').value = document.getElementById('stylethemes').value + document.getElementById('stylebcg').value;
document.getElementById('applystylethemes1').innerHTML = document.getElementById('FOTOPROFIL').value;
};

function pastefoto() {
EditData();
document.getElementById('AVRfoto').value = "";
document.getElementById('AVRfoto').value = document.getElementById('copy_img').value;
document.getElementById('upload-Preview').getAttribute("src") = document.getElementById('AVRfoto').value;
};

function hidedataverifikasi() {
document.getElementById("dataverifikasi").style.display = "none";
document.getElementById("passwordlogin").style.display = "none";
};

function getfoto(address) {
	document.getElementById('copy_img').value =  "<img id='fotoprofil' src='" + address.src + "'> "
}
function paste() {
var x = document.getElementById("USERNAME").value;
document.getElementById("namapesdik").innerHTML = x;
var y = document.getElementById("KEY").value;
document.getElementById("keypesdik").innerHTML = y;
var z = document.getElementById("KLSS").value;
document.getElementById("kelaspesdik").innerHTML = z;
var a = document.getElementById("AVRfoto").value;
document.getElementById("avatarfoto").innerHTML = a;
document.getElementById("namapesdik2").innerHTML = x;
var b = document.getElementById("FOTOPROFIL").value;
document.getElementById("TEMAANDA").innerHTML = b;
}

window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);
