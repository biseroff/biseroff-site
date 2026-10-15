// Dashboard 2 store (Supabase, public.dash2_items). Publishable key; RLS limits anon to reading items and toggling done.
window.Dash2 = (function(){
  var BASE="https://fikcuycaejwjetemicnc.supabase.co/rest/v1";
  var KEY="sb_publishable_ZFv1nRtxc9gdoE8-b_PQ1g_7VJUMrlH";
  var H={"apikey":KEY,"Authorization":"Bearer "+KEY,"Content-Type":"application/json"};
  function req(method,url,body,extra){
    return fetch(url,{method:method,headers:Object.assign({},H,extra||{}),body:body?JSON.stringify(body):undefined}).then(function(r){
      if(!r.ok) return r.text().then(function(t){throw new Error(method+" "+r.status+": "+t)});
      return r.status===204?null:r.json();
    });
  }
  return {
    items: function(){ return req("GET",BASE+"/dash2_items?select=id,section,ord,title,advice,weight,done,done_at&order=id.asc"); },
    setDone: function(id,done){ return req("PATCH",BASE+"/dash2_items?id=eq."+encodeURIComponent(id),{done:!!done,done_at:done?new Date().toISOString():null}); }
  };
})();
