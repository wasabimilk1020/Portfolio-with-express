var animData = {
  wrapper: document.querySelector('#animationWindow'),
  animType: 'svg',
  loop: true,
  prerender: true,
  autoplay: true,
  path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json'
};

var anim = bodymovin.loadAnimation(animData);
anim.setSpeed(2);

window.addEventListener('load',function() {
setTimeout(function(){
  $("#animationWindow").fadeOut('slow');
  // $("main").fadeIn('slow');
  document.querySelector('.container').removeAttribute('style');
  document.querySelector('#loading').remove();
},2000);
});