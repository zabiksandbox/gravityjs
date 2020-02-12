if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};
function getRandom(min, max){
  return (Math.random() * (max - min)) + min;
};

fabric.Canvas.prototype.getItemsByName = function (name) {
    var objectList = [],
    objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].name && objects[i].name == name) {
            objectList.push(objects[i]);
        }
    }
    if(objectList[0])
    return objectList;
    else 
    return false;
};
function getItemByName (name) {
    var objectList = [];
    for (var i = 0; i < World.length; i++) {
        if (World[i].name && World[i].name == name) {
            objectList.push(World[i]);
        }
    }
    if(objectList[0])
    return objectList[0];
    else 
    return false;
};

fabric.Object.prototype.toObject = (function (toObject) {
    return function () {
        return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
        });
    };
})(fabric.Object.prototype.toObject);
var time=Date.now();
var deltaTime=0;
function updateinfo(){
    $('.info .stars .val').text(World.length);
};

fobject=function(x,y,m,force,sticky=false,selected=false,name='Star'){
        this.name=(name!=null?name:('Star'+World.length+1));
        this.dom=null;
        this.mass=(m!=null?m:1);
        this.radius=1;
        this.force=[];
        this.force.x=0;
        this.systemcenter=false;
        this.force.y=0;
        this.cleanforce=[];
        this.cleanforce.x=0;
        this.cleanforce.y=0;
        this.position=[];
        this.position.x=0;
        this.position.y=0;
        this.sticky=sticky;
        this.selected=selected;
        this.text=new fabric.Text(
            this.name, 
            { 
                left: this.position.x, 
                top: this.position.y-this.radius, 
                fontFamily: 'Consolas', 
                fontSize: 14*Game.frame.getZoom(),
                fill: '#ffffff',
            }
        );
        /*this.line=new fabric.Line([this.position.x, this.position.y, this.position.x+this.force.x, this.position.y+this.force.y], {
            strokeDashArray: [1, 1],
            stroke: 'red',
            hasControls:false,
            selectable:false,
            originX:'center',
            originY:'center',
        });
        this.forceline=new fabric.Line([this.position.x, this.position.y, this.position.x+this.cleanforce.x, this.position.y+this.cleanforce.y], {
            strokeDashArray: [1, 1],
            stroke: 'white',
            hasControls:false,
            selectable:false,
            originX:'center',
            originY:'center',
        });*/
        this.addForce=function(x,y){
            x=parseFloat(x);
            y=parseFloat(y);
        	/*if(Game.collapse===false){
	        	this.force.x*=0.9999;
    	        this.force.y*=0.9999;
            }*/         
            this.force.x+=x;
            this.force.y+=y;
            this.cleanforce.x+=x;
            this.cleanforce.y+=y;
            
        };
        this.cleanforces=function(){
            this.cleanforce.x=0;
            this.cleanforce.y=0;
        }
        this.aaddForce=function(x,y){
            x=parseFloat(x);
        	if(Game.collapse===false){
	        	this.force.x*=0.999;
    	        this.force.y*=0.999;
            }         
            this.force.x+=x;
            this.force.y+=y;
            this.cleanforce.x+=x;
            this.cleanforce.y+=y;
        };
        this.checkColor=function(){
            if(this.mass>10000&&this.dom.fill!='black'){
                this.dom.fill='black';
                this.dom.set('shadow','0px 0px '+parseInt((this.radius*4)>5?(this.radius*4):5)+'px  #ffffff');
                this.radius=Math.sqrt(Math.abs(this.mass)/(10*Math.PI));
            } else if(this.mass<10001) {
                this.radius=Math.sqrt(Math.abs(this.mass)/Math.PI);
                if(this.radius<1)this.radius=1;
                if(this.mass<0){
					rgb=colorTemperatureToRGB(this.mass*10+10000);
				} else {
					rgb=colorTemperatureToRGB(this.mass*10+1000);	
				}
                this.dom.fill='rgb('+parseInt(rgb.r)+','+parseInt(rgb.g)+','+parseInt(rgb.b)+')';
                this.dom.set('shadow','0px 0px '+parseInt((this.radius*4)>5?(this.radius*4):5)+'px '+this.dom.fill);             
                /*console.log(this.mass);
                console.log(this.dom.fill);
                console.log(rgb);*/
            }
            
        };
        this.Move=function(){
            //if(this.dom.selected===false){
	            this.position.x+=(deltaTime/Game.timescale)*this.force.x/this.mass;
	            this.position.y+=(deltaTime/Game.timescale)*this.force.y/this.mass;
                

                if(this.selected==true){
                    /*this.line.set('x1',this.position.x)
                    this.line.set('y1',this.position.y)
                    

                    this.line.set('x2',this.position.x+((deltaTime/Game.timescale)*this.force.x*10/this.mass))
                    this.line.set('y2',this.position.y+((deltaTime/Game.timescale)*this.force.y*10/this.mass))

                    var endxvectore=this.position.x+((deltaTime/Game.timescale)*this.cleanforce.x*100/Game.gravity);
                    var endyvectore=this.position.y+((deltaTime/Game.timescale)*this.cleanforce.y*100/Game.gravity);   

                    //if(endxvectore>100)endxvectore*=0.5;
                    //if(endyvectore>100)endyvectore*=0.5;
                    
                    this.forceline.set('x1',this.position.x)
                    this.forceline.set('y1',this.position.y)
                    this.forceline.set('x2',endxvectore);
                    this.forceline.set('y2',endyvectore);*/
                    this.text.set('left',this.position.x);
                    this.text.set('top',this.position.y-this.radius-16);
                    this.text.set('fontSize', 14/Game.frame.getZoom());
                    
                }
                

	            this.dom.set('left',this.position.x);
	            this.dom.set('top',this.position.y);
	            this.dom.set('radius',this.radius);
	            if(this.sticky==true){
					Game.moveFrameTo(-1*(deltaTime/Game.timescale)*this.force.x/this.mass,-1*(deltaTime/Game.timescale)*this.force.y/this.mass)
				}
				
				/*
				rgb=colorTemperatureToRGB((Math.abs((deltaTime/Game.timescale)*this.force.x/this.mass)+Math.abs((deltaTime/Game.timescale)*this.force.y/this.mass))*1000)
				this.dom.fill='rgb('+parseInt(rgb.r)+','+parseInt(rgb.g)+','+parseInt(rgb.b)+')';
                this.dom.set('shadow','0px 0px '+parseInt((this.radius*4)>5?(this.radius*4):5)+'px '+this.dom.fill);             
                */
                
            //}
        };

        this.explode=function(){
            //BADABUM
        };
        this.remove=function(){
            World.splice(World.indexOf(this),1);
            /*this.line.remove();
            this.forceline.remove();*/
            this.text.remove();
            this.dom.remove();
            updateinfo();
        };
        this.init=function(){
            this.position.x=x;
            this.position.y=y;
            this.dom = new fabric.Circle({
                  name: 'Star'+(World.length+1),
                  radius: this.radius, 
                  left: this.position.x, 
                  top: this.position.y,
                  shadow: '0px 0px 5px #FFFF00',
                  hasRotatingPoint:false,
                  hasControls:false,
                  selectable:true,
                  originX:'center',
                  originY:'center' 
            });
            this.dom.vx=0;
            this.dom.vy=0;

            this.dom.on('mousedown', function(event){
                
                /*elem=getItemByName(event.target.name);
                if(elem.selected==true){
                    elem.selected=false;
                    elem.sticky=false;
                    event.target.selected=false;
                } else {
                    event.target.selected=true;
                    elem.selected=true;
                    elem.sticky=true;    
                }*/
            });

            Game.frame.add(this.dom);
            Game.frame.add(this.text);
            /*Game.frame.add(this.line);
            Game.frame.add(this.forceline);*/
            this.checkColor();
            //World.push(this);
            
            

            updateinfo();
        };
        this.init();
        World[World.length]=this;
        return this;
};
function adddoublsesystem(){
    var sm=500;

    var radius=50;
    var v=Math.sqrt(Game.gravity*((sm*sm/(radius*0.1))));


    var star1=new fobject(
                    $(window).width()/2/Game.frame.getZoom(),
                    $(window).height()/2/Game.frame.getZoom(),
                    sm,[],false,true).addForce(0,-v*-4.5);


    var star2=new fobject(
                    $(window).width()/2/Game.frame.getZoom()+radius,
                    $(window).height()/2/Game.frame.getZoom(),
                    sm,[],false,true).addForce(0,-v*4.5);



    var qp=8;
    var D=Array(
        0,
        3,
        6,
        12,
        24,
        48,
        96,
        192,
        384,
    );
    var PlanetMasses=Array(
        1,
        3,
        3,
        2,
        1,
        100,
        90,
        50,
        45,
    );
    var i=1

    for(p=0;p<=qp;p++){
        i=i*-1;
        
        pm=PlanetMasses[p];

        var radius=(D[p]+4/10)*60;
        var v=Math.sqrt(Game.gravity*(((sm*2)*pm*pm)/(radius)));

        new fobject(
            $(window).width()/2/Game.frame.getZoom()+(radius)*i ,
            $(window).height()/2/Game.frame.getZoom(),
            pm, [],false,true
        ).addForce(0,-v*i);     
    
    }

}
function addsystem(){
    Game.moveFrameToS(0,0);
	var sm=500;
	
	
	var qp=8;
    var D=Array(
        0,
        3,
        6,
        12,
        24,
        48,
        96,
        192,
        384,
    );
    var PlanetMasses=Array(
        1,
        2,
        3,
        2,
        1,
        100,
        90,
        50,
        45,
    );

    var Pnames=Array(
        'Mercury',
        'Venus',
        'Earth',
        'Mars',
        '[ring]',
        'Upiter',
        'Saturn',
        'Uran',
        'Neptun',
    );
	var star=new fobject(
					$(window).width()/2/Game.frame.getZoom(),
					$(window).height()/2/Game.frame.getZoom(),
					sm,[],false,true,'Sun');
    star.systemcenter=true;
    star.sticky=true;


	var i=1
    var systemmass=0;
	for(p=0;p<qp;p++){
        i=i*-1;
        var pm=PlanetMasses[p];
        systemmass+=pm;
		var radius=(D[p]+4/10)*120;
        
        
		var planet=new fobject(
			$(window).width()/2/Game.frame.getZoom()+(radius)*i ,
			$(window).height()/2/Game.frame.getZoom(),
			pm, [],false,true,Pnames[p]
		);
        var v=Math.sqrt(    Game.gravity * ((sm)/(radius))   )*pm;
        planet.addForce(0,-v*i);
  
        if(p==2){

            //Moon
            var moonmass=0.1;
            var moonr=19.5;
            var Moon=new fobject(
                $(window).width()/2/Game.frame.getZoom()+(radius+moonr)*i ,
                $(window).height()/2/Game.frame.getZoom(),
                moonmass, [],false,true,'Moon'
            );
            var vm=Math.sqrt(Game.gravity*((pm)/(moonr)))*moonmass;

            Moon.addForce(0,-vm*i);
        }
        if(p==3){

        
            //demos
            var moonmass=0.03;
            var moonr=20;
            var Demos=new fobject(
                $(window).width()/2/Game.frame.getZoom()+(radius+moonr)*i ,
                $(window).height()/2/Game.frame.getZoom(),
                moonmass, [],false,true,'Demos'
            );
            var vm=Math.sqrt(    Game.gravity * ((pm)/(moonr))   )*moonmass;
            Demos.addForce(0,-vm*i);
            vm=null;
            moonr=null;
        }

        

        star.addForce(0,v*i);
	
	}
	
				
	
}
Game=function(){
    this.maxv=0;
    this.maxd=0;
    this.timescale=15;
    this.pause=false;
    this.gravity=0.1;
    this.frame='';
    this.type='+';
    this.defmass=1;
    this.offset=[];
    this.offset.x=$('#frame').width();
    this.offset.y=$('#frame').height();
    this.collapse=true;
    this.start=function(){
        this.frame=new fabric.Canvas('frame',{width:$(window).width(),height:$(window).height(),renderOnAddRemove:false,centeredScaling:true});    
        this.frame.selection = false; 
        this.frame.setBackgroundColor('black');
	    this.frame.on('mouse:down',function(options){
	    
	        lx = options.e.pageX;
	        ly = options.e.pageY;
	    })
	    this.frame.on('mouse:up',function(options){
	    	if(Game.type==='+'){
				var s = new fobject(
					(options.e.pageX-Game.frame.viewportTransform[4])/Game.frame.getZoom(),
					(options.e.pageY-Game.frame.viewportTransform[5])/Game.frame.getZoom(),
					1
				);
				s.addForce(((options.e.pageX - lx) * World[World.length-1].mass / 50),((options.e.pageY - ly) * World[World.length-1].mass / 50))	
			} else {
				var s = new fobject(
					(options.e.pageX-Game.frame.viewportTransform[4])/Game.frame.getZoom(),
					(options.e.pageY-Game.frame.viewportTransform[5])/Game.frame.getZoom(),
					-1
				);
				s.addForce(((options.e.pageX - lx) * World[World.length-1].mass / 50),((options.e.pageY - ly) * World[World.length-1].mass / 50))
			}
            if(World[0].systemcenter==true){
               s.selected=true;
            }
	        
	    });
        Game.frameUpdate();        
    };
    this.frameUpdate=function(){
    	deltaTime=Date.now()-time;
        
    	time=Date.now();
        if(Game.pause==false){
            if(Game.collapse===true){
                Game.moveStars();
            } else {
                Game.moveAtoms();
            }
            
            for(i in World){
                World[i].Move();
            }
        }
        fabric.util.requestAnimFrame(Game.frameUpdate, Game.frame.getElement());
        Game.frame.renderAll();
    };
    this.limits=function(iam){
         maxv=Math.sqrt(Math.pow(iam.force.x,2)+Math.pow(iam.force.y,2));
         
        if(Game.maxv<maxv)Game.maxv=maxv; 
         
        d=iam.radius*2;
        if(Game.maxd<d) Game.maxd=d;

        
    };
    this.moveAtoms=function(){
        for(i=0;i<World.length;i++){
            if(typeof World[i] === "undefined" ) continue;
            World[i].cleanforces();
        }
        for(i=0;i<World.length;i++){
        	if(typeof World[i] === "undefined" ) continue;
            this.limits(World[i]);
            for(e=0;e<World.length;e++){
                if(e === i || typeof World[e] === "undefined" ) continue;
				iam =     World[i];
                target =  World[e];
                var x=0,
                    y=0,
                    r=Math.sqrt(Math.pow(Math.abs(iam.position.x-target.position.x),2)+Math.pow(Math.abs(iam.position.y-target.position.y),2)),
                    rx=(iam.position.x-target.position.x),
                    ry=(iam.position.y-target.position.y),
                    
    			
               
               newmass=iam.mass+target.mass;
               range=iam.radius+target.radius;
               
               if(range<1)range=1;
               
               if(
               r<(range+x*-1)||
               r<(range+y*-1)
               ){
                   if(iam.mass>=target.mass){
                       maxk=iam;
                       mink=target;
                   }else{
                       maxk=target;
                       mink=iam;
                   }
	               maxk.force.x=(maxk.force.x+mink.force.x);
  	               maxk.force.y=(maxk.force.y+mink.force.y);
  	               maxk.mass=maxk.mass+mink.mass;
  	               maxk.checkColor();
   	               mink.remove();
              }else if (r<range+50){
	              	f=parseFloat(Game.gravity*((iam.mass*target.mass)/Math.pow(r,2)));
	               	if(r>0){
	                   x=f*(rx/r);
	                   y=f*(ry/r);
	               	}
                  iam.aaddForce(x*1,y*1);                       
              } else{
	              	f=parseFloat(Game.gravity*((iam.mass*target.mass*2)/Math.pow(r,2)));
	               	if(r>0){
	                   x=f*(rx/r);
	                   y=f*(ry/r);
	               	}
                  iam.aaddForce(x*-1,y*-1); 
              }
           }
        }
        Game.maxv=0;
        Game.maxd=0;
    };
    
    this.moveStars=function(){
        for(i=0;i<World.length;i++){
            if(typeof World[i] === "undefined" ) continue;
            World[i].cleanforces();
        }
        for(i=0;i<World.length;i++){
        	if(typeof World[i] === "undefined" ) continue;
            this.limits(World[i]);
            for(e=0;e<World.length;e++){
                
                if(e === i || typeof World[e] === "undefined" || typeof World[i]==='undefined') continue;
				iam =     World[i];
                
                
                target =  World[e];
                var x=0,
                    y=0,
                    r=Math.sqrt(Math.pow(Math.abs(iam.position.x-target.position.x),2)+Math.pow(Math.abs(iam.position.y-target.position.y),2)),
                    rx=(iam.position.x-target.position.x),
                    ry=(iam.position.y-target.position.y);
                    if(r>10000)r=10000;
                    /*if(r>3000)r=800;
                    if(r>2000)r=700;
                    if(r>1000)r=600;
                    if(r>500)r=500;*/

                var f=parseFloat(Game.gravity*((iam.mass*target.mass)/Math.pow(r,2)));


    
               if(r>0){
                   x=f*(rx/r);
                   y=f*(ry/r);                             
               }
                        
               newmass=iam.mass+target.mass;
               range=iam.radius+target.radius;
               
               if(range<3)range=3;

               if(r<range){
	               if(iam.mass>=target.mass){
	                   maxk=iam;
	                   mink=target;
	                }else{
	                   maxk=target;
	                   mink=iam;
	                }
	               maxk.force.x=(maxk.force.x+mink.force.x);
	               maxk.force.y=(maxk.force.y+mink.force.y);
	               maxk.mass=maxk.mass+mink.mass;
	               if(maxk.mass==0){
						mink.remove();	
						maxk.remove();	
				   } else {
		               maxk.checkColor();
		               if(mink.sticky==true) {mink.sticky=false; maxk.sticky=true;}
		               mink.remove();
	               }
               }else{
                   iam.addForce(x*-1,y*-1);
               }
            }
        }
        Game.maxv*=0.9;
        Game.maxd*=0.9;
    };
    this.dogrid=function(){
         y=50;
         grid=80;
         while(y<$(window).height()){
             x=50;
             while(x<$(window).width()){
                 new fobject(x,y,Game.type=='+'?1:-1);
                 x=x+grid;
             }
             y=y+grid;
         }
    };
    this.moveFrame=function(s){
    	switch(event.code){
    		case 'ArrowLeft':{
    			var delta = new fabric.Point(10,0);
        		Game.frame.relativePan(delta);
    			break;
    		}
    		case 'ArrowRight':{
    			var delta = new fabric.Point(-10,0);
        		Game.frame.relativePan(delta);
    			break;
    		}
    		case 'ArrowUp':{
    			var delta = new fabric.Point(0,10);
        		Game.frame.relativePan(delta);
    			break;
    		}
    		case 'ArrowDown':{
    			var delta = new fabric.Point(0,-10);
        		Game.frame.relativePan(delta);
    			
    			break;
    		}
    	}
    };
    this.moveFrameTo=function(x,y){
    	var delta = new fabric.Point(x*Game.frame.getZoom(),y*Game.frame.getZoom());
        Game.frame.relativePan(delta);
    };
    this.moveFrameToS=function(x,y){
        var delta = new fabric.Point(x*Game.frame.getZoom(),y*Game.frame.getZoom());
        Game.frame.absolutePan(delta);
    };
    this.scaleWorld=function(k, point){    	

    	if(Game.frame.getZoom()>=0.2 || k>1){
    		Game.frame.zoomToPoint(point, Game.frame.getZoom() * k )
    		if(parseInt($(window).width()/Game.frame.getZoom())>$(window).width()){
    			Game.frame.setWidth(parseInt($(window).width()/Game.frame.getZoom()));
    			Game.frame.setHeight(parseInt($(window).height()/Game.frame.getZoom()));		
    		}
    		
    	}
    	
    };
};







$(document).ready(function(){
	$(document).keydown(function(){
		
		if($('.gravity input:not(:focus)').length==1){
			Game.moveFrame(event.code)	
		}
		
	});
	$(document).on('mousewheel',function(){
		
		point = new fabric.Point(event.pageX,event.pageY);
		var deltaY=event.deltaY;
		if(deltaY>0){
			Game.scaleWorld(0.9,point);
		} else {
			Game.scaleWorld(1.1,point);
		}
	});
    World=[];
    Game=new Game();
    Game.start();
    
    
    $('.gravity .val').text(Game.gravity);
    $('.gravity input').val(Game.gravity*10);
    
    /*$('.upper-canvas').click(function(e){
        World[World.length]=new fobject(e.pageX,e.pageY,Game.defmass);
        console.log();
    })*/ 
    console.log('http://pikabu.ru/story/gravitatsionnaya_js_zalipalka_4552933')
    console.log('Thanks to:');
    console.log('prgr');
    console.log('iiyctou');
    console.log('brainfick');
    console.log('impcyber')
     
    
    var lx = 0; 
    var ly = 0;
        
    $('.type select').change(function(){
    	//console.log($(this).val());
    	Game.type=$(this).val();
    });
    $('.pause input').click(function(){
        Game.pause===true?Game.pause=false:Game.pause=true;
    })
    
    $('.gravity input').change(function(){
        Game.gravity=$(this).val()/10;        
        $('.gravity .val').text($(this).val()/10)
    })
     
    $('.clear input').click(function(){
        Game.pause=true;
        Game.frame.clear();
        World=[];
        Game.pause=false;
    });
    $('.collapse input').change(function(){
        if($(this).prop('checked')==true){
            Game.collapse=true;
        } else {
            Game.collapse=false;
        }
    });
    $('.defmass input').change(function(){
        Game.defmass=$(this).val();
        //console.log($(this).val())
    })
    $('.freez input').click(function(){
        for(var i in World){
            World[i].force.x=0;
            World[i].force.y=0;
        }
    });
    
    $('.info').css({'font-size':$('#frame').width()/120})
    setInterval(function(){
        if($('.randomgen input.randomgen').prop('checked') && World.length<$('.randomgen .limit').val() && Game.pause===false){
            new fobject(getRandomInt(0,$('#frame').width()),getRandomInt(0,$('#frame').height()),Game.type=='+'?1:-1).addForce(getRandom(Game.gravity*-1,Game.gravity)/5,getRandom(Game.gravity*-1,Game.gravity)/5)
        }
    },$('.randomgen .limit').val()/Game.gravity/5)
    
    //$('.comment-wrapper').css({'height':$(window).height()})

});
$(window).resize(function(){
	//$('.comment-wrapper').css({'height':$(window).height()})
    Game.frame.setWidth($(window).width());
    Game.frame.setHeight($(window).height());
    Game.frame.renderAll();
    $('.info').css({'font-size':$('#frame').width()/100})
});
