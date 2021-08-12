const { hostname, pathname } = new URL(window.location);
console.log(hostname);
console.log(pathname);
const formattedPathName = pathname.split("/").splice(1).join(",") || "root";
console.log(formattedPathName);

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
head.appendChild(link);

var closeIcons=document.getElementsByClassName('product-form__submit');
///generate/${hostname}/popups/${formattedPathName}
fetch(`http://localhost:8080/${hostname}`)
.then((res) => res.json())
.then((data) =>{
  console.log(data);
  if(data.publish=="published")
  {
    closeIcons[0].style.setProperty('--animate-duration', data.speed+'s');
    if(data.trigger=="hover")
    {
      function closeBigImgAndContainer() {
        closeIcons[0].className = "product-form__submit button button--full-width button--secondary animate__animated animate__"+data.name_animation;
      }
    
      function closeBigImgAndContainer1() {
        closeIcons[0].className = "product-form__submit button button--full-width button--secondary";
      }
    
      for (i = 0; i < closeIcons.length; i++) {
          closeIcons[i].addEventListener("mouseover", closeBigImgAndContainer);
      }
      
      for (i = 0; i < closeIcons.length; i++) {
          closeIcons[i].addEventListener("mouseout", closeBigImgAndContainer1);
      }
    }
    else
    {
      closeIcons[0].className = "product-form__submit button button--full-width button--secondary animate__animated animate__"+data.name_animation+" animate__infinite";
    }
  }
})
.catch((err) => console.log(err));