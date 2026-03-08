// ── CURSOR ──
    const cursor=document.getElementById('cursor');
    const ring=document.getElementById('cursorRing');
    const dot=document.getElementById('cursorDot');
    let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx = e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
    (function animCursor(){rx += (mx - rx) * .12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animCursor);})();
document.querySelectorAll('.btn-cta,.btn-ghost,.vc-add,.cs-item,.nav-link,.nav-cart,.float-card,.theme-btn').forEach(el=>{
        el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.opacity = '.8'; });
  el.addEventListener('mouseleave',()=>{ring.style.width = '34px';ring.style.height='34px';ring.style.opacity='.5';});
});

    // ── PARTICLES ──
    const canvas=document.getElementById('particles');
    const ctx=canvas.getContext('2d');
    let W,H,parts=[];
    function resize(){W = canvas.width = window.innerWidth;H=canvas.height=window.innerHeight;}
    resize();window.addEventListener('resize',resize);

    class P{
        constructor(){this.reset(true);}
    reset(init){
        this.x = Math.random() * W;
    this.y=init?Math.random()*H:H+8;
    this.vx=(Math.random()-.5)*.25;
    this.vy=-(Math.random()*.35+.08);
    this.r=Math.random()*1.4+.3;
    this.op=Math.random()*.22+.04;
    this.life=0;this.maxL=Math.random()*380+180;
    this.warm=Math.random()>.5;
  }
    tick(){
        this.x += this.vx;this.y+=this.vy;
    this.vx+=Math.sin(this.life*.018)*.006;
    this.life++;
    const p=this.life/this.maxL;
    const f=p<.2?p/.2:p>.7?(1-p)/.3:1;
    this.cur=this.op*f;
    if(this.life>=this.maxL||this.y<-8)this.reset(false);
  }
    draw(){
        ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle=this.warm?`rgba(200,133,74,${this.cur})`:`rgba(212,168,68,${this.cur})`;
    ctx.fill();
  }
}
    for(let i=0;i<50;i++)parts.push(new P());
    (function anim(){ctx.clearRect(0, 0, W, H);parts.forEach(p=>{p.tick();p.draw();});requestAnimationFrame(anim);})();

// ── PARALLAX ──
document.addEventListener('mousemove',e=>{
  const xp=(e.clientX/W-.5)*20;
    const yp=(e.clientY/H-.5)*14;
    const vc=document.querySelector('.visual-card');
    if(vc)vc.style.transform=`translateY(${yp * .35}px) rotate(${xp * .02}deg)`;
  document.querySelectorAll('.orb').forEach((o,i)=>{
    const f=(i+1)*.35;
    o.style.transform=`translateX(${xp * f}px) translateY(${yp * f}px)`;
  });
  document.querySelectorAll('.float-card').forEach((fc,i)=>{
    const f=.2+(i*.12);
    fc.style.transform=`translateY(${-yp * f}px) translateX(${xp * f * .5}px)`;
  });
});

    // ── THEME ──
    let dark=false;
    function toggleTheme(){
        dark = !dark;
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    document.getElementById('themeBtn').textContent=dark?'☀️':'🌙';
}
