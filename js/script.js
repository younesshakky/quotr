var bodyWrap = document.querySelector('.page-wrapper');
var emos = document.querySelectorAll('.svg-faces');
var quoPage = document.querySelector('.quote-page');
var quoContent = document.querySelector('.content');

var qLength = 0, 
    num = 0,
    xhttp,
    res,
    width,
    svgClone;

window.addEventListener('load', function () {
  // browser handling
  if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest;
  }else{
    throw new Error("you're using an 10.000BC browser, are you a fucking dinossaur??")
  }

  xhttp.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200){
      res = JSON.parse(this.response);
    }
  }
  xhttp.open('GET', 'quotes.json');
  xhttp.send();

  bodyWrap.classList.remove('is_hidden');
  bodyWrap.classList.add('is_visible');  
});

document.getElementById('back').onclick = function() {
  quoPage.classList.remove('is_visible');
  setTimeout(function(){
    svgClone.remove();
  }, 300);
}

function printQuote(resText){
  quoContent.innerText = resText;
}

for(i = 0; i < emos.length;i++){
  emos[i].onmouseover = function(){
    switch (this.id) {
      case 'happy':
        bodyWrap.style.background = '#5CAB7D';
        break;
      case 'angry':
        bodyWrap.style.background = '#E71D36';
        break;
      case 'loved':
        bodyWrap.style.background = '#ff7473';
        break;
      case 'sad':
        bodyWrap.style.background = '#3C3530';
        break;
      case 'disgusted':
        bodyWrap.style.background = '#791E94';
        break;
      default:
        throw new Error("this isn't a valid id");
    }
  }

  emos[i].onclick = function(){
    num = Math.floor(Math.random() * qLength); 

    quoPage.classList.add('is_visible')
    quoPage.style.backgroundColor = getComputedStyle(bodyWrap).backgroundColor;

    svgClone = this.cloneNode(true);
    svgClone.classList.remove('svg-faces');
    svgClone.id = 'on-top';
    quoPage.appendChild(svgClone);
    // console.log(svgClone)    
    if (quoContent.innerText == "undefined"){
      printQuote('yeah im undefined');
    }
    switch (this.id) {

      case 'happy':
        qLength = res.happy.length;
        printQuote(res.happy[num]);
        break;
      case 'angry':
        qLength = res.angry.length;
        printQuote(res.angry[num]);
        break;
      case 'loved':
        qLength = res.loved.length;
        printQuote(res.loved[num]);
        break;
      case 'sad':
        qLength = res.sad.length;
        printQuote(res.sad[num]);
        break;
      case 'disgusted':
        qLength = res.disgusted.length;
        printQuote(res.disgusted[num]);
        break;
      default:
        throw new Error("this isn't a valid id");
    }
    console.log(num);
  }
}

// resizable svg
// why not in media queries?
// i dont know i just like it this way..
// PS: name please

function anyFuckingName(){
  width = window.innerWidth;
  var svgIcon = document.querySelectorAll('.svg-faces');

  function resize (width, height){
    for(let i = 0; i < svgIcon.length; i++){
      svgIcon[i].style.width = width;
      svgIcon[i].style.height = height;
    }
  }

  if(width < 734){
    resize('90px', '90px');
    
  }else if(width < 396){
      resize('60px', '60px');
  }else{
    resize('120px', '120px');
  }
}

window.onload   = anyFuckingName;
window.onresize = anyFuckingName;
