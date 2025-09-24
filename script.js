/* Boot */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  const app = document.getElementById('app');
  setTimeout(() => {
    pre.style.opacity = '0';
    setTimeout(() => {
      pre.style.display = 'none';
      app.classList.remove('hidden');
      app.style.opacity = '1';
      app.style.pointerEvents = 'auto';
      bootAnimations();
      // Ensure hero CTA buttons are fully visible after load
      try {
        document.querySelectorAll('.cta-row .btn').forEach(b=>{b.style.opacity='1'});
      } catch (_) {}
    }, 300);
  }, 900);
});

function bootAnimations(){
  if (window.gsap){
    gsap.registerPlugin(ScrollTrigger);

    /* Hero entrance */
    gsap.from('.logo',{y:10,opacity:0,duration:.6,ease:'power2.out'});
    gsap.from('.hero h1',{y:12,opacity:0,duration:.6,delay:.1});
    gsap.from('.subtitle',{y:12,opacity:0,duration:.6,delay:.18});
    gsap.from('.cta-row .btn',{y:12,opacity:0,stagger:.08,duration:.5,delay:.24});

    /* Floating shapes */
    gsap.to('.hero-shapes .s1',{yoyo:true,repeat:-1,y:14,duration:3.6,ease:'sine.inOut'});
    gsap.to('.hero-shapes .s2',{yoyo:true,repeat:-1,y:-16,duration:4.2,ease:'sine.inOut'});
    gsap.to('.hero-shapes .s3',{yoyo:true,repeat:-1,y:10,duration:3.8,ease:'sine.inOut'});

    /* Feature cards */
    const cards = gsap.utils.toArray('.features .card');
    cards.forEach((el, i)=>{
      gsap.fromTo(el,{opacity:0,y:18},{opacity:1,y:0,scrollTrigger:{trigger:el,start:'top 85%'},duration:.5,delay:i*0.04});
    });

    /* About fly-ins */
    gsap.utils.toArray('.fly-in-left').forEach((el)=>{
      gsap.to(el,{opacity:1,x:0,duration:.6,scrollTrigger:{trigger:el,start:'top 80%'}});
    });
    gsap.utils.toArray('.fly-in-right').forEach((el)=>{
      gsap.to(el,{opacity:1,x:0,duration:.6,scrollTrigger:{trigger:el,start:'top 80%'}});
    });

    /* Screenshots scroll-sequence */
    const shots = gsap.utils.toArray('.shot');
    shots.forEach((shot, idx)=>{
      gsap.to(shot,{
        opacity:1,scale:1,
        scrollTrigger:{
          trigger: '.screenshots-sequence',
          start: () => `top+=${idx*120} center`,
          end: () => `top+=${(idx+1)*120} center`,
          scrub:true,
        }
      });
      if (idx>0){
        // fade previous out slightly to sequence
        const prev = shots[idx-1];
        gsap.to(prev,{
          opacity:.15,
          scrollTrigger:{
            trigger: '.screenshots-sequence',
            start: () => `top+=${idx*120} center`,
            end: () => `top+=${(idx+1)*120} center`,
            scrub:true,
          }
        });
      }
    });

    /* Bottom nav indicator and active state */
    const indicator = document.querySelector('.nav-indicator');
    const items = gsap.utils.toArray('[data-nav]');
    function activate(el){
      items.forEach(i=>i.classList.remove('active'));
      el.classList.add('active');
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();
      indicator.style.transform = `translateX(${rect.left-parentRect.left}px)`;
      indicator.style.width = rect.width + 'px';
    }
    items.forEach(i=>{
      i.addEventListener('click', (e)=>{
        activate(i);
      });
    });

    // sync with sections on scroll
    const sections = ['#home','#features','#screenshots','#about','#contact','#footer'];
    sections.forEach((sel, idx)=>{
      const el = document.querySelector(sel);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: ()=>activate(items[idx]),
        onEnterBack: ()=>activate(items[idx])
      });
    });
  }
}


