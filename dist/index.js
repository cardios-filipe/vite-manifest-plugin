var c=(n,s,t)=>new Promise((o,f)=>{var a=i=>{try{r(t.next(i))}catch(e){f(e)}},l=i=>{try{r(t.throw(i))}catch(e){f(e)}},r=i=>i.done?o(i.value):Promise.resolve(i.value).then(a,l);r((t=t.apply(n,s)).next())});import{writeFileSync as d}from"fs";import{resolve as y}from"path";import{readFile as u}from"fs/promises";var p=(n,s)=>c(void 0,null,function*(){var f,a,l;try{let r=y(`${n!=null?n:""}/${s.fileName}`),i=JSON.parse(yield u(r,"utf-8"));for(let e in i)if(Object.prototype.hasOwnProperty.call(i,e)&&(i[e].file=`${(f=s.publicPath)!=null?f:"/"}${i[e].file}`,i[e].hasOwnProperty("css")))for(let m in i[e].css)i[e].css[m]=`${(a=s.publicPath)!=null?a:"/"}${i[e].css[m]}`;if(i["index.html"]){var t=[];for(var o in i["index.html"].css)t.push(`${(l=s.publicPath)!=null?l:"/"}${i["index.html"].css[o]}`);i["index.html"].css=t}d(r,JSON.stringify(i,null,2))}catch(r){console.error("An error occurred:",r)}});var x=n=>c(void 0,null,function*(){return{name:"vite-manifest-plugin",enforce:"post",apply:"build",writeBundle(f){return c(this,arguments,function*({dir:o}){yield p(o,n)})}}});export{x as viteManifestPlugin};
//# sourceMappingURL=index.js.map