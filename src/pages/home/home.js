import axios from "axios";
import React, {useEffect} from "react";
const Home =()=> {
    const [res,setRes] = React.useState([]);
    const [inputV,setInputV] = React.useState('');
    return (
        <div>
            <div>测试home</div>
            <div>{res.map(item=>(<h1>{item}</h1>))}</div>
            <input value={inputV} onChange={(newValue)=>{setInputV(newValue.target.value)}}/>
            <button onClick={()=>setRes(getTest(inputV))}>请求</button>
        </div>
    );
}

function getTest(e){
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    //return axios.get('http://localhost:8080/s?wd='+e).then((response)=>{console.log(response.data);return response.data});
    return ["成功","曹公","次公"];
}
export default Home