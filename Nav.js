const nav=document.querySelector('.navigation')
document.querySelector('.taggle').onclick=function(){
    this.classList.toggle('active')
    nav.classList.toggle('active')
}