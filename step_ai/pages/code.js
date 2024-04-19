window_size = 60;

function update_code(code){
     let highlighted_code = hljs.highlight(code, {language: "python"}).value
     if (highlighted_code[highlighted_code.length = 1] == "\n"){highlighted_code +=" "}
     const result_element = document.getElementById("highlighting_content")
    result_element.innerHTML = highlighted_code;
}
function sync_scroll() {
  const text_element = document.getElementById("python_code")
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.getElementById("highlighting");
  // Get and set x and y
  
  result_element.scrollTop = text_element.scrollTop/ text_element.scrollHeight * result_element.scrollHeight;
  //result_element.scrollLeft = text_element.scrollLeft;
}

systems = [
    {
        "name":"gyr_x",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"gyr_y",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"gyr_z",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"acc_x",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"acc_y",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"acc_z",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"o_a",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"o_b",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
    {
        "name":"o_d",
        "max_val": 1,
        "min_val": -1,
        "values":[]
    },
]


o_a = 0
o_b = 0
o_d = 0

function handleOrientation(e){
    o_a = event.alpha
    o_b = event.beta
    o_d = event.gamma
}

function draw_coordinate_systems(){

    systems.forEach((elem)=>{
        const canvas = document.getElementById(elem["name"]);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#FFFFFF";

        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.moveTo(0,canvas.height/2);
        ctx.lineTo(canvas.width,canvas.height/2);
        ctx.stroke();


        let min = elem["min_val"];
        let max = elem["max_val"];
        const max_abs = Math.max(Math.abs(min), Math.abs(max))
        ctx.beginPath()

        let num_values = elem["values"].length
        elem["values"].forEach((v,i)=>{
            if(i ==0){
                ctx.moveTo(0,canvas.height * (v + max_abs)/(2*max_abs));
            }
            else{
                ctx.lineTo(i/num_values * canvas.width, canvas.height * (v + max_abs)/(2 * max_abs))
            }
        })
        ctx.stroke()
    })
}

function createHandle(resetValues=false, call_on_window_size_reached=(e)=>undefined){

    function handleMotion(e){
        
        systems[0]["values"].push(event.rotationRate.alpha)
        systems[1]["values"].push(event.rotationRate.beta)
        systems[2]["values"].push(event.rotationRate.gamma)
        systems[3]["values"].push(event.acceleration.x)
        systems[4]["values"].push(event.acceleration.y)
        systems[5]["values"].push(event.acceleration.z)
        systems[6]["values"].push(o_a)
        systems[7]["values"].push(o_b)
        systems[8]["values"].push(o_d)


        let window_full = false;
        if(systems[0]["values"].length === window_size){
            console.log("full")
            call_on_window_size_reached();
            if(resetValues){
                window_full = true
            }
        }

        for(let i=0; i<=8; ++i){
            let vs = systems[i]["values"]
            let last = vs[vs.length - 1];
            if(last > systems[i]["max_val"]){
                systems[i]["max_val"] = last;
            }
            if(last < systems[i]["min_val"]){
                systems[i]["min_val"] = last;
            }


            if (window_full){
                systems[i]["values"].length = 0;
            }

        }
        draw_coordinate_systems();

    }
    return handleMotion
}


function add_motion_eventlistner(f){
 if (typeof DeviceMotionEvent.requestPermission === 'function') {
  DeviceMotionEvent.requestPermission()
   .then(permissionState => {
   if (permissionState === 'granted') {
    window.addEventListener('devicemotion',f );
   }
  })
   .catch(console.error);
 } else {
    window.addEventListener('devicemotion',f );
 }
}

function add_orientation_eventlistner(f){
 if ( DeviceOrientationEvent.requestPermission === 'function') {
  DeviceOrientationEvent.requestPermission()
   .then(permissionState => {
   if (permissionState === 'granted') {
    window.addEventListener('deviceorientation', f);
   }
  })
   .catch(console.error);
 } else {
    window.addEventListener('deviceorientation', f);
 }}
