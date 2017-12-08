!function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){if(i(1),"undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("tooltip",{schema:{text:{default:""},end:{type:"vec3"},src:{default:""},rotation:{type:"vec3"},width:{default:1,min:0},height:{default:1,min:0},lineColor:{default:"#fff",type:"color"},lineHorizontalAlign:{default:"left",oneOf:["left","right","center"]},lineVerticalAlign:{default:"center",oneOf:["top","bottom","center"]},opacity:{default:1,min:0,max:1},targetPosition:{type:"vec3",if:{targetType:["position"]}}},init:function(){var t=this.el,e=this.data,i=this.quad=document.createElement("a-entity");i.setAttribute("rotation",e.rotation),i.setAttribute("text",{width:.25,color:"#fff",value:e.text,align:"center"}),t.appendChild(i);var o=this.material=new THREE.LineBasicMaterial({color:e.lineColor,opacity:e.opacity,transparent:e.opacity<1}),n=this.geometry=new THREE.BufferGeometry;n.addAttribute("position",new THREE.BufferAttribute(new Float32Array(6),3)),this.line=new THREE.Line(n,o),this.el.setObject3D("tooltip-line",this.line)},updateTooltip:function(){var t=new THREE.Vector3,e=new THREE.Vector3,i=new THREE.Vector3;return function(){var o=this.data;t.copy(this.el.getAttribute("position")),e.copy(o.targetPosition);var n=e.sub(t),r={top:(o=this.data).height/2,bottom:-o.height/2,center:0},s={left:-o.width/2,right:o.width/2,center:0},a=r[o.lineVerticalAlign],l=s[o.lineHorizontalAlign];this.quad.object3D.updateMatrix(),i.set(l,a,0),i.applyMatrix4(this.quad.object3D.matrix);var h=this.geometry.attributes.position.array;h[0]=i.x,h[1]=i.y,h[2]=i.z,h[3]=n.x,h[4]=n.y,h[5]=n.z,this.geometry.attributes.position.needsUpdate=!0,this.material.opacity=o.opacity,this.material.transparent=o.opacity<1,this.material.color.setStyle(o.color)}}(),update:function(){this.updateTooltip()}})},function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("slice9",{schema:{width:{default:1,min:0},height:{default:1,min:0},left:{default:0,min:0},right:{default:0,min:0},bottom:{default:0,min:0},top:{default:0,min:0},side:{default:"front",oneOf:["front","back","double"]},padding:{default:.1,min:.01},color:{type:"color",default:"#fff"},opacity:{default:1,min:0,max:1},transparent:{default:!0},debug:{default:!1},src:{type:"map"}},multiple:!1,init:function(){var t=this.data,e=this.material=new THREE.MeshBasicMaterial({color:t.color,opacity:t.opacity,transparent:t.transparent,wireframe:t.debug}),i=this.geometry=new THREE.PlaneBufferGeometry(t.width,t.height,3,3);new THREE.TextureLoader;this.plane=new THREE.Mesh(i,e),this.el.setObject3D("mesh",this.plane),this.textureSrc=null},updateMap:function(){function t(t){this.material.map=t,this.material.needsUpdate=!0,this.regenerateMesh()}var e=this.data.src;if(e){if(e===this.textureSrc)return;return this.textureSrc=e,void this.el.sceneEl.systems.material.loadTexture(e,{src:e},t.bind(this))}this.material.map&&t(null)},regenerateMesh:function(){function t(t,e,i){o[3*t]=e,o[3*t+1]=i}function e(t,e,i){n[2*t]=e,n[2*t+1]=i}var i=this.data,o=this.geometry.attributes.position.array,n=this.geometry.attributes.uv.array,r=this.material.map.image;if(r){var s={left:i.left/r.width,right:i.right/r.width,top:i.top/r.height,bottom:i.bottom/r.height};e(1,s.left,1),e(2,s.right,1),e(4,0,s.bottom),e(5,s.left,s.bottom),e(6,s.right,s.bottom),e(7,1,s.bottom),e(8,0,s.top),e(9,s.left,s.top),e(10,s.right,s.top),e(11,1,s.top),e(13,s.left,0),e(14,s.right,0);var a=i.width/2,l=i.height/2,h=-a+i.padding,d=a-i.padding,c=l-i.padding,u=-l+i.padding;t(0,-a,l),t(1,h,l),t(2,d,l),t(3,a,l),t(4,-a,c),t(5,h,c),t(6,d,c),t(7,a,c),t(8,-a,u),t(9,h,u),t(10,d,u),t(11,a,u),t(13,h,-l),t(14,d,-l),t(12,-a,-l),t(15,a,-l),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.uv.needsUpdate=!0}},update:function(t){var e=this.data;this.material.color.setStyle(e.color),this.material.opacity=e.opacity,this.material.transparent=e.transparent,this.material.wireframe=e.debug,this.material.side=function(t){switch(t){case"back":return THREE.BackSide;case"double":return THREE.DoubleSide;default:return THREE.FrontSide}}(e.side);var i=AFRAME.utils.diff(e,t);"src"in i?this.updateMap():("width"in i||"height"in i||"padding"in i||"left"in i||"top"in i||"bottom"in i||"right"in i)&&this.regenerateMesh()},remove:function(){},pause:function(){},play:function(){}})}]),AFRAME.registerComponent("camera-position",{schema:{mobile:{type:"vec3",default:"0 1.6 3"},desktop:{type:"vec3",default:"0 1.6 3"}},init:function(){this.onCameraSetActive=this.onCameraSetActive.bind(this),this.resetCamera=this.resetCamera.bind(this),this.el.addEventListener("camera-set-active",this.onCameraSetActive),this.el.addEventListener("exit-vr",this.onCameraSetActive),this.el.addEventListener("enter-vr",this.resetCamera)},onCameraSetActive:function(){var t=this.el.camera.el,e=this.data,i=AFRAME.utils.device.isMobile()?e.mobile:e.desktop,o=t.components.camera.savedPose;o&&(o.position.z=i.z),this.el.camera.el.setAttribute("position",i)},resetCamera:function(){var t=this.el.camera.el,e=t.getAttribute("position");t.setAttribute("position",{x:e.x,y:e.y,z:0})}}),AFRAME.registerComponent("ground",{schema:{url:{default:""}},update:function(){var t,e=this;this.objectLoader||((t=this.objectLoader=new THREE.ObjectLoader).setCrossOrigin(""),t.load(this.data.url,function(t){t.children.forEach(function(t){t instanceof THREE.Mesh&&(t.geometry.computeFaceNormals(),t.geometry.computeVertexNormals(),t.receiveShadow=!0,t.material.shading=THREE.FlatShading)}),e.el.setObject3D("ground",t)}))}}),AFRAME.registerSystem("link-controls",{init:function(){this.peeking=!1}}),AFRAME.registerComponent("link-controls",{schema:{hand:{default:"left"}},init:function(){var t=this.el,e=this;t.setAttribute("laser-controls",{hand:this.data.hand}),t.setAttribute("raycaster",{far:100,objects:"[link]"}),t.addEventListener("controllerconnected",function(t){var i=AFRAME.utils.device.isMobile(),o=t.detail.name;"daydream-controls"!==o&&"gearvr-controls"!==o||"left"!==e.data.hand?(e.controller=o,e.addControllerEventListeners(),e.initTooltips(),i||e.initURLView()):e.el.setAttribute("raycaster","showLine",!1)}),this.cameraPosition=new THREE.Vector3,this.peeking=!1,this.linkPositionRatio=0,this.linkAnimationDuration=250,this.bindMethods()},tick:function(t,e){this.animate(e)},initURLView:function(){var t=this.urlEl=document.createElement("a-entity"),e=this.urlBackgroundEl=document.createElement("a-entity");t.setAttribute("text",{color:"white",align:"center",font:"kelsonsans",value:"",width:.5}),t.setAttribute("position","0 0.1 -0.25"),t.setAttribute("visible",!1),e.setAttribute("position","0 -0.0030 -0.001"),e.setAttribute("slice9","width: 0.5; height: 0.1; left: 32; right: 32; top: 64; bottom: 32; src: images/tooltip.png"),e.setAttribute("scale","1 0.5 1"),t.appendChild(e),this.el.appendChild(t)},tooltips:{"vive-controls":{left:{touchpad:{tooltip:"text: Press and hold touchpad to peek link; width: 0.1; height: 0.04; targetPosition: 0 0.05 0",position:"0.1 0.05 0.048",rotation:"-90 0 0"},trigger:{tooltip:"text: Press trigger to traverse link; width: 0.11; height: 0.04; targetPosition: 0 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.11 -0.055 0.04",rotation:"-90 0 0"}},right:{touchpad:{tooltip:"text: Press and hold touchpad to peek link; width: 0.1; height: 0.04; targetPosition: 0 0.05 0",position:"0.1 0.05 0.048",rotation:"-90 0 0"},trigger:{tooltip:"text: Press trigger to traverse link; width: 0.11; height: 0.04; targetPosition: 0 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.11 -0.055 0.04",rotation:"-90 0 0"}}},"oculus-touch-controls":{left:{xbutton:{tooltip:"text: Press X to peek link; width: 0.1; height: 0.04; targetPosition: 0.01 0.05 0",position:"0.09 0.055 0.050",rotation:"-90 0 0"},trigger:{tooltip:"text: Press trigger to traverse link; width: 0.11; height: 0.04; targetPosition: 0.01 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.13 -0.055 0.04",rotation:"-90 0 0"}},right:{abutton:{tooltip:"text: Press A to peek link; width: 0.1; height: 0.04; targetPosition: -0.01 0.05 0",position:"0.09 0.055 0.050",rotation:"-90 0 0"},trigger:{tooltip:"text: Press trigger to traverse link; width: 0.11; height: 0.04; targetPosition: -0.005 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.11 -0.055 0.04",rotation:"-90 0 0"}}},"daydream-controls":{touchpad:{tooltip:"text: Touch to peek, click to traverse link; width: 0.11; height: 0.04; targetPosition: -0.005 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.11 -0.055 0.04",rotation:"-90 0 0"}},"gearvr-controls":{touchpad:{tooltip:"text: Touch to peek, click to traverse link; width: 0.11; height: 0.04; targetPosition: -0.005 -0.06 0.06; lineHorizontalAlign: right;",position:"-0.11 -0.055 0.04",rotation:"-90 0 0"}}},initTooltips:function(){var t,e=this.tooltips,i=this.el;if(this.controller){var o=i.getAttribute(this.controller).hand;t=o?e[this.controller][o]:e[this.controller],Object.keys(t).forEach(function(e){var o=t[e],n=document.createElement("a-entity");n.setAttribute("tooltip",o.tooltip),n.setAttribute("position",o.position),n.setAttribute("rotation",o.rotation),i.appendChild(n)})}},bindMethods:function(){this.onMouseEnter=this.onMouseEnter.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this),this.startPeeking=this.startPeeking.bind(this),this.stopPeeking=this.stopPeeking.bind(this)},play:function(){var t=this.el.sceneEl;t.addEventListener("mouseenter",this.onMouseEnter),t.addEventListener("mouseleave",this.onMouseLeave),this.addControllerEventListeners()},pause:function(){var t=this.el.sceneEl;t.removeEventListener("mouseenter",this.onMouseEnter),t.removeEventListener("mouseleave",this.onMouseLeave),this.removeControllerEventListeners()},addControllerEventListeners:function(){var t=this.el;if(this.controller)switch(this.controller){case"vive-controls":t.addEventListener("trackpaddown",this.startPeeking),t.addEventListener("trackpadup",this.stopPeeking);break;case"daydream-controls":t.addEventListener("trackpadtouchstart",this.startPeeking),t.addEventListener("trackpadtouchend",this.stopPeeking);break;case"oculus-touch-controls":t.addEventListener("xbuttondown",this.startPeeking),t.addEventListener("xbuttonup",this.stopPeeking),t.addEventListener("abuttondown",this.startPeeking),t.addEventListener("abuttonup",this.stopPeeking);break;case"gearvr-controls":t.addEventListener("trackpadtouchstart",this.startPeeking),t.addEventListener("trackpadtouchend",this.stopPeeking);break;default:console.warn("Uknown controller "+this.controller+". Cannot attach link event listeners.")}},removeControllerEventListeners:function(){var t=this.el;switch(!this.controller){case"vive-controls":t.removeEventListeners("trackpaddown",this.startPeeking),t.removeEventListeners("trackpadup",this.stopPeeking);break;case"daydream-controls":t.removeEventListeners("trackpadtouchstart",this.startPeeking),t.removeEventListeners("trackpadtouchend",this.stopPeeking);break;case"oculus-touch-controls":t.removeEventListener("xbuttondown",this.startPeeking),t.removeEventListener("xbuttonup",this.stopPeeking),t.removeEventListener("abuttondown",this.startPeeking),t.removeEventListener("abuttonup",this.stopPeeking);break;case"gearvr-controls":t.removeEventListener("trackpadtouchstart",this.startPeeking),t.removeEventListener("trackpadtouchend",this.stopPeeking);break;default:console.warn("Uknown controller "+this.controller+". Cannot remove link event listeners.")}},startPeeking:function(){var t=this.selectedLinkEl;!t||this.system.peeking||this.animatedEl||(this.peeking=!0,this.system.peeking=!0,this.animatedEl=t,this.animatedElInitPosition=t.getAttribute("position"),this.updateCameraPosition())},stopPeeking:function(){this.peeking=!1,this.system.peeking=!1},updateCameraPosition:function(){var t=this.el.sceneEl.camera;t.parent.updateMatrixWorld(),t.updateMatrixWorld(),this.cameraPosition.setFromMatrixPosition(t.matrixWorld)},animate:function(){var t=new THREE.Vector3,e=new THREE.Vector3;return function(i){var o=this.animatedEl;if(o){if(!this.peeking&&0===this.linkPositionRatio)return o.setAttribute("position",this.animatedElInitPosition),o.setAttribute("link","peekMode",!1),o.components.link.showAll(),void(this.animatedEl=void 0);this.peeking&&1===this.linkPositionRatio?o.setAttribute("link","peekMode",!0):o.components.link.hideAll();var n=i/this.linkAnimationDuration;this.linkPositionRatio+=this.peeking?n:-n,this.linkPositionRatio=Math.min(Math.max(0,this.linkPositionRatio),1),t.copy(this.animatedElInitPosition),e.copy(this.cameraPosition).sub(t);var r=e.length();e.normalize(),e.multiplyScalar(r*function(t){return--t*t*t+1}(this.linkPositionRatio)),t.add(e),this.linkPositionRatio>0&&this.linkPositionRatio<1?o.components.link.textEl.setAttribute("visible",!1):o.components.link.textEl.setAttribute("visible",!0),r<=.5&&this.peeking||o.setAttribute("position",t)}}}(),onMouseEnter:function(t){var e,i=this.selectedLinkEl,o=t.detail.intersectedEl,n=this.urlEl;o&&!i&&void 0!==o.components.link&&(o.setAttribute("link","highlighted",!0),this.selectedLinkElPosition=o.getAttribute("position"),this.selectedLinkEl=o,n&&(e=o.getAttribute("link"),n.setAttribute("text","value",e.title||e.href),n.setAttribute("visible",!0)))},onMouseLeave:function(t){var e=this.selectedLinkEl,i=this.urlEl;e&&t.detail.intersectedEl&&(e.setAttribute("link","highlighted",!1),this.selectedLinkEl=void 0,i&&i.setAttribute("visible",!1))}});