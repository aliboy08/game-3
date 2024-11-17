(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const n of h.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerPolicy&&(h.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?h.credentials="include":o.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function s(o){if(o.ep)return;o.ep=!0;const h=t(o);fetch(o.href,h)}})();const _={P1:{KeyW:"move_up",KeyS:"move_down",KeyA:"move_left",KeyD:"move_right",KeyJ:"shoot_bullet",KeyK:"shoot_laser"}};function k(e){const i={},t={move_up:()=>{e.move_y_stop(),i.move_down&&e.move_down()},move_down:()=>{e.move_y_stop(),i.move_up&&e.move_up()},move_left:()=>{e.move_x_stop(),i.move_right&&e.move_right()},move_right:()=>{e.move_x_stop(),i.move_left&&e.move_left()}};document.addEventListener("keydown",s=>{if(!_[e.id])return;const o=_[e.id][s.code];i[o]=!0,typeof e[o]=="function"&&e[o]()}),document.addEventListener("keyup",s=>{const o=_[e.id][s.code];i[o]=!1,typeof t[o]=="function"&&t[o]()})}function y(e){const i=e.ctx.canvas;function t(){let s=i.width-e.width,o=i.height-e.height;e.position.x<0?e.position.x=0:e.position.x>s&&(e.position.x=s),e.position.y<0?e.position.y=0:e.position.y>o&&(e.position.y=o)}e.hooks.update.push(t)}function E(e){const i={rate:2e3,y:!1,x:!1};e.decelerate=i;function t(h){s(h),o(h)}function s(h){i.x&&e.velocity.x!==0&&(e.velocity.x>0?(e.velocity.x-=i.rate*h.seconds_passed,e.velocity.x<0&&(e.velocity.x=0)):(e.velocity.x+=i.rate*h.seconds_passed,e.velocity.x>0&&(e.velocity.x=0)))}function o(h){i.y&&e.velocity.y!==0&&(e.velocity.y>0?(e.velocity.y-=i.rate*h.seconds_passed,e.velocity.y<0&&(e.velocity.y=0)):(e.velocity.y+=i.rate*h.seconds_passed,e.velocity.y>0&&(e.velocity.y=0)))}e.hooks.update.push(t)}function L(e){e.move_speed=300,e.direction="right",e.move_up=()=>{e.direction="up",e.decelerate.y=!1,e.velocity.y=-e.move_speed},e.move_down=()=>{e.direction="down",e.decelerate.y=!1,e.velocity.y=e.move_speed},e.move_left=()=>{e.direction="left",e.decelerate.x=!1,e.velocity.x=-e.move_speed},e.move_right=()=>{e.direction="right",e.decelerate.x=!1,e.velocity.x=e.move_speed},e.move_y_stop=()=>{e.decelerate.y=!0},e.move_x_stop=()=>{e.decelerate.x=!0};function i(o){o.strokeRect(e.position.x,e.position.y,e.width,e.height)}function t(o){s(o)}function s(o){e.position.x+=e.velocity.x*o.seconds_passed,e.position.y+=e.velocity.y*o.seconds_passed}e.hooks.draw.push(i),e.hooks.update.push(t),y(e),E(e)}function S(e){const s={up:h,down:n,left:p,right:u};let o={x:0,y:0,w:0,h:0};function h(){o.x=e.position.x+e.width/2-8/2,o.y=e.position.y-16,o.w=8,o.h=16}function n(){o.x=e.position.x+e.width/2-8/2,o.y=e.position.y+e.height,o.w=8,o.h=16}function p(){o.x=e.position.x-16,o.y=e.position.y+e.height/2-8/2,o.w=16,o.h=8}function u(){o.x=e.position.x+e.width,o.y=e.position.y+e.height/2-8/2,o.w=16,o.h=8}function r(){s[e.direction]()}function d(a){a.save(),a.strokeStyle="lightgreen";let{x:m,y:g,w:x,h:b}=o;a.strokeRect(m,g,x,b),a.restore()}e.barrel={coordinates:o},e.hooks.update.push(r),e.hooks.draw.push(d)}class K{constructor(i){this.velocity=i.velocity??800,this.width=i.width??5,this.height=i.height??5,this.direction=i.direction??i.entity.direction,this.set_initial_position(i)}set_initial_position(i){if(typeof i.position<"u"){this.position=i.position;return}let{x:t,y:s}=i.entity.barrel.coordinates;const o=i.entity.barrel.coordinates.w,h=i.entity.barrel.coordinates.h;this.direction==="right"?(t+=o,s+=h/2-this.width/2):this.direction==="left"?(t-=this.width,s+=h/2-this.width/2):this.direction==="up"?(t+=o/2-this.width/2,s-=this.height):this.direction==="down"&&(t+=o/2-this.height/2,s+=h),this.position={x:t,y:s}}update(i){let t=this.velocity*i.seconds_passed;this.direction==="right"?this.position.x+=t:this.direction==="left"?this.position.x-=t:this.direction==="up"?this.position.y-=t:this.direction==="down"&&(this.position.y+=t)}draw(i){i.save(),i.strokeStyle="cyan";let{x:t,y:s}=this.position;i.strokeRect(t,s,this.width,this.height),i.restore()}}class O{constructor(i){this.velocity=i.velocity??800,this.direction=i.direction??i.entity.direction,this.set_dimensions(i),this.set_initial_position(i),this.shrink_rate=i.shrink_rate??20}set_dimensions(i){let t=i.height??800;this.direction==="right"||this.direction==="left"?(this.width=t,this.height=i.entity.barrel.coordinates.h):(this.direction==="up"||this.direction==="down")&&(this.width=i.entity.barrel.coordinates.w,this.height=t)}set_initial_position(i){if(typeof i.position<"u"){this.position=i.position;return}let{x:t,y:s}=i.entity.barrel.coordinates;const o=i.entity.barrel.coordinates.w,h=i.entity.barrel.coordinates.h;this.direction==="right"?t+=o:this.direction==="left"?t-=this.width:this.direction==="up"?(t+=o/2-this.width/2,s-=this.height):this.direction==="down"&&(s+=h),this.position={x:t,y:s}}update(i){let t=this.shrink_rate*i.seconds_passed;this.direction==="right"||this.direction==="left"?(this.height-=t,this.position.y+=t/2,this.height<=0&&(this.height=0,typeof this.on_complete=="function"&&this.on_complete(this))):(this.direction==="up"||this.direction==="down")&&(this.width-=t,this.position.x+=t/2,this.width<=0&&(this.width=0,typeof this.on_complete=="function"&&this.on_complete(this)))}draw(i){i.save(),i.strokeStyle="cyan";let{x:t,y:s}=this.position;i.strokeRect(t,s,this.width,this.height),i.restore()}}function P(e){let i={top:0,bottom:e.ctx.canvas.height,right:e.ctx.canvas.width,left:0},t=[],s=[],o=!1;e.shoot_bullet=()=>{t.push(new K({entity:e}))},e.shoot_laser=()=>{if(o)return;o=!0;const r=new O({entity:e});r.on_complete=()=>{n(r,s),o=!1},s.push(r)};function h(r){(r.position.x<i.left||r.position.x>i.right||r.position.y<i.top||r.position.y>i.bottom)&&n(r,t)}function n(r,d){d.splice(d.indexOf(r),1)}function p(r){t.forEach(d=>{d.update(r),h(d)}),s.forEach(d=>{d.update(r)})}function u(r){t.forEach(d=>{d.draw(r)}),s.forEach(d=>{d.draw(r)})}e.hooks.update.push(p),e.hooks.draw.push(u)}class R{constructor(i,t){this.ctx=t,this.id=i,this.width=30,this.height=30,this.position={x:200,y:200},this.velocity={x:0,y:0},this.hooks={update:[],draw:[]},L(this),k(this),S(this),P(this)}draw(i){this.hooks.draw.forEach(t=>t(i))}update(i){this.hooks.update.forEach(t=>t(i))}}const f={previous:0,seconds_passed:0};let c,l,v=[];function q(){B(),A(),requestAnimationFrame(w)}window.addEventListener("load",q);function A(){v.push(new R("P1",l))}function F(e){v.forEach(i=>i.update(e))}function N(e){e.clearRect(0,0,c.width,c.height),v.forEach(i=>i.draw(e))}function B(){c=document.querySelector("canvas"),c.width=1e3,c.height=500,l=c.getContext("2d"),l.strokeStyle="green",l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high"}function w(e){f.seconds_passed=(e-f.previous)/1e3,f.previous=e,F(f),N(l),requestAnimationFrame(w)}