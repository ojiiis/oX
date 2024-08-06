exports.ojox = ()=>{
    const imp = {
     get:{},
     post:{},
     delete:{},
     option:{},
     session:{},
     storage:{}
    }
    function addImp(method,path,addImpCb){
     imp[method][path] = addImpCb
    }
    const run = {
    get:(path,appCb)=>addImp('get',path,appCb),
    post:(path,appCb)=>addImp('post',path,appCb),
    listen:(port,cb = ()=>0)=>{
      const http = require("http");
     server = http.createServer((req,res)=>{
        const qs = require("querystring")
 
    const actualUrl = req.url.split("?")[0]
    const queryString = req.url.split("?")[1]

    req.query = qs.parse(queryString);
    req.url = actualUrl;
        const {method,url} = req;
        calls = imp[method.toLocaleLowerCase()][url];
        if(calls){
            res.send = (data)=>{
             res.statusCode = 200;
             res.write(data);
             res.end();
            }
            calls(req,res)
        }else{
            res.statusCode = 200;
            res.write(`Can not get ${url}`)
            res.end()
        }
     });
     server.listen(port,cb)
    }
    
    };
    return run;
}

