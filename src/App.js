import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

class SChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {arr: props.val, num:props.val.length/2, size:200, colors:['#FFE3C1','#D5BFD6','#F6D0CF','#BBE0F0','#C9E6E2', '#BEF2B8', '#ADADAD', '#FFCBA3', '#FFFA75', '#EEE']};
  }

  generateRing = (ring) => {
    var incr = 100/this.state.num;
    var stmnt = 'conic-gradient(';
    var percent = 0;
    var color = '';
    
    for (var i=0; i<this.state.num-1; i++) {
      if (this.state.arr[i*2] >= (ring*10)-5) {
          color=this.state.colors[i];
      } else {
        color='rgba(255,255,255,0)';
      }
      stmnt += color+' '+percent+'% '+(percent+incr)+'%, ';
      percent+=incr;
    };
    stmnt+=((this.state.arr[this.state.num*2-2] >= (ring*10)-5) ? this.state.colors[this.state.num-1] : 'rgba(255,255,255,0)') + ' '+percent+'% ' + (percent+incr) +'%)';
    return stmnt;
  }

  render() {


    const rings = [...Array(10).keys()].map(i => (10-i));
    const angle = 2*Math.PI/this.state.num;
    console.log(rings);
    
    const map = (val, x1, x2, y1, y2) => y1+(val-x1)/(x2-x1)*(y2-y1);

    const half = Math.floor(this.state.num/2);
    var extra = 0;
    if (this.state.num%2 == 1) {
      extra = 1;
    }

    const leftTagsArray = [...Array(half).keys()].map(i => (i+half+extra));


    return (
      <div style={{width:this.state.size+200, height:this.state.size+200, position:'relative'}}> 
         {rings.map(r => (
            <div class="ring" style={{
                  width:r*(this.state.size/10),
                  height:r*(this.state.size/10),
                  background:this.generateRing(r)}}>
            </div>
        ))}

      {[...Array(this.state.num).keys()].map(i => (
        <div>
          <div class="line" style={{width:this.state.size/2, transform: 'rotate('+(angle*i-Math.PI/2)+'rad)'}}></div>     
        </div>
      ))}

    {[...Array(half).keys()].map(i => (
        <div class="tags-wrapper">
          <div class="tags align-right" style={{transform:'translate('+this.state.size*(map(this.state.arr[i*2],0,100,.45,.8))*Math.cos(angle*i-(Math.PI)/2-angle/2+angle)+'px,'+this.state.size*(map(this.state.arr[i*2],0,100,.45,.8))*Math.sin(angle*i-Math.PI/2-angle/2+angle)+'px)'}}>{this.state.arr[i*2+1]}<br></br><b>{this.state.arr[i*2]}%</b></div>
        </div>
      ))}

    {[...Array(extra).keys()].map(i => (
        <div class="tags-wrapper">
          <div class="tags align-center" style={{transform:'translate('+this.state.size*(map(this.state.arr[(i+half)*2],0,100,.45,.8))*Math.cos(angle*(i+half)-(Math.PI)/2-angle/2+angle)+'px,'+this.state.size*(map(this.state.arr[(i+half)*2],0,100,.45,.8))*Math.sin(angle*(i+half)-Math.PI/2-angle/2+angle)+'px)'}}>{this.state.arr[(i+half)*2+1]}<br></br><b>{this.state.arr[(i+half)*2]}%</b></div>
        </div>
      ))}

    {leftTagsArray.map(i => (
        <div class="tags-wrapper">
          <div class="tags" style={{transform:'translate('+this.state.size*(map(this.state.arr[i*2],0,100,.45,.8))*Math.cos(angle*i-(Math.PI)/2-angle/2+angle)+'px,'+this.state.size*(map(this.state.arr[i*2],0,100,.45,.8))*Math.sin(angle*i-Math.PI/2-angle/2+angle)+'px)'}}>{this.state.arr[i*2+1]}<br></br><b>{this.state.arr[i*2]}%</b></div>
        </div>
      ))}

      </div>
      
    )
  }
}

function App() {

  const demoArr = [50.6, "Attribute 1", 70.8, "Attribute 2", 9, "Attribute 3", 31.4, "Attribute 4", 95.9, "Attribute 5", 89.3, "Attribute 6", 27.7, "Attribute 7"]
  const demoArr2 = [50.6, "Attribute 1", 89.9, "Attribute 2", 78.0, "Attribute 3", 5.6, "Attribute 4"];

  return (
    <div>
      <SChart val={demoArr}/>
    </div>
  );
}

export default App;
