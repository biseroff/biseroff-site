// Shared store for dashboard 1 (Supabase, public.dash1_users). Publishable key is safe to ship; RLS limits it to this table.
window.Dash1 = (function(){
  var URL="https://fikcuycaejwjetemicnc.supabase.co/rest/v1/dash1_users";
  var KEY="sb_publishable_ZFv1nRtxc9gdoE8-b_PQ1g_7VJUMrlH";
  var H={"apikey":KEY,"Authorization":"Bearer "+KEY,"Content-Type":"application/json"};
  function req(method,url,body,extra){
    var h=Object.assign({},H,extra||{});
    return fetch(url,{method:method,headers:h,body:body?JSON.stringify(body):undefined}).then(function(r){
      if(!r.ok) return r.text().then(function(t){throw new Error(method+" "+r.status+": "+t)});
      return r.status===204?null:r.json();
    });
  }
  return {
    list: function(){ return req("GET",URL+"?select=id,name,created_at&order=created_at.asc,id.asc").then(function(rows){
      return rows.map(function(r){return {id:r.id,name:r.name,at:String(r.created_at).slice(0,10)}}); }); },
    add: function(name){ return req("POST",URL,{name:name},{"Prefer":"return=representation"}); },
    remove: function(id){ return req("DELETE",URL+"?id=eq."+encodeURIComponent(id)); },
    reset: function(){ return req("DELETE",URL+"?id=gt.0").then(function(){ return req("POST",URL,[{name:"Convo 1",created_at:"2026-10-14"},{name:"Convo 2",created_at:"2026-10-14"}]); }); }
  };
})();
