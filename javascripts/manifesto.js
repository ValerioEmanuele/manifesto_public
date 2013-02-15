var Manifesto={init:function(){$("#content").hide(),Manifesto.fetchSignatories(1)},confirmation:function(e){var t=e.lang,n=e.id,r={};$.postJSON("sign/confirmation",{id:n}).done(function(e){e.success?$.fetchStaticJSON("jsons/manifesto/"+t+".json").done(function(i){Manifesto.fetchContent(i),$("html").attr("lang",t),$("title").html(i.title),$("a.heading_title").attr("href","#/"+t),$.fetchStaticJSON("jsons/messages/"+t+".json").done(function(i){r.name=e.name,r.message=i.signatory_not_confirmed,r.sign=i.sign,r.decline=i.decline,r.lang=t,r.id=n,$("div#message").html(Partials.renderSignatureConfirm(r)),$("a#confirm").click(function(e){e.preventDefault(),$.postJSON("sign/confirm",{id:n}).done(function(e){if(e.success)r.message=i[e.message],r.description="<a href='#/"+t+"'>"+i.view_all_signatories+"</a>",$("div#message").html(Partials.renderMessage(r));else{var n=e.errors[0];r.message=i.something_went_wrong,r.description=i[n],$("#manifesto, #sign, #reading, #signatory-table").hide(),$("div#message").html(Partials.renderMessage(r))}})}),$("a#decline").click(function(e){e.preventDefault(),$.postJSON("sign/decline",{id:n}).done(function(e){if(e.success)r.message=i[e.message],r.description="<a href='#/"+t+"'>"+i.view_all_signatories+"</a>";else{var n=e.errors[0];$("#manifesto, #sign, #reading, #signatory-table").hide(),r.message=i.something_went_wrong,r.description=i[n]}$("div#message").html(Partials.renderMessage(r))})})}),$("#content, #content_top, #footer, #manifesto, div#message").show(),$("#sign, #view, #reading, #signatory-table").hide()}):$.fetchStaticJSON("jsons/manifesto/"+t+".json").done(function(i){Manifesto.fetchContent(i),$("html").attr("lang",t),$("title").html(i.title),$("a.heading_title").attr("href","#/"+t),$("#manifesto, #sign, #reading, #signatory-table").hide(),$.fetchStaticJSON("jsons/messages/"+t+".json").done(function(i){var s=e.errors[0],o=i[s];s=="signatory_not_found"?($("div#message").html("<h2>"+i.something_went_wrong+"</h2><p class='text_center'>"+o+"</p>"),$("#content, #content_top, #footer, div#message").show(),$("#manifesto, #sign, #reading, #signatory-table").hide()):s=="signatory_already_confirmed"&&(r.name=e.name,r.message=o,r.remove_me=i.remove_me,$("div#message").html(Partials.renderSignatureRemove(r)),$("a#remove").click(function(e){e.preventDefault(),$.postJSON("sign/decline",{id:n}).done(function(e){if(e.success)r.message=i[e.message],r.description="<a href='#/"+t+"'>"+i.view_all_signatories+"</a>";else{var n=e.errors[0];$("#manifesto, #sign, #reading, #signatory-table").hide(),r.message=i.something_went_wrong,r.description=i[n]}$("div#message").html(Partials.renderMessage(r))})}),$("#content, #content_top, #footer, #manifesto, div#message").show(),$("#sign, #view, #reading, #signatory-table").hide())})})})},translate:function(e){Transitions.before(function(){$("div#sign, div#reading, div#message").hide(),$.fetchStaticJSON("jsons/reading/"+e+".json").done(function(e){$("div#reading").html(Partials.renderReading(e))}),$.fetchStaticJSON("jsons/sign/"+e+".json").done(function(e){$("div#sign").html(Partials.renderSign(e))}),$.fetchStaticJSON("jsons/manifesto/"+e+".json").done(function(t){$("html").attr("lang",e),$("title").html(t.title),Manifesto.fetchContent(t),$("a.heading_title").attr("href","#/"+e),$("a#sign").attr("href","#/"+e+"/sign"),$("a#reading").attr("href","#/"+e+"/reading"),$("#content_top, #manifesto, #signatory-table, #footer").show(),Transitions.after(function(){Manifesto.bindSignButton(e),Transitions.infiniteScroll(function(){Manifesto.fetchMoreSignatories()})})})})},signatureFormJSON:function(){return{sign:{name:$("#signatory_name").val(),email:$("#signatory_email").val(),location:$("#signatory_location").val()}}},bindSignButton:function(e){$("#sign-button").on("click",function(){$.postJSON(e+"/sign/sign",Manifesto.signatureFormJSON()).done(function(t){t.success?Transitions.before(function(){$.fetchStaticJSON("jsons/sign/"+e+".json").done(function(e){var t=e.confirmation;t.signatory_email=$("#signatory_email").val(),$("div#message").html(Partials.renderConfirmation(t)),$("div#message").show(),$("#sign").hide(),Transitions.after()})}):Transitions.before(function(){var n=t.errors;$.fetchStaticJSON("jsons/sign/"+e+".json").done(function(e){e.errors=n,$("#signature-form-errors").html(Partials.renderSignatureErrors(e)),Transitions.after()})})})})},fetchContent:function(e){$("#content_top").html(Partials.renderContentTop(e)),$("#manifesto").html(Partials.renderManifesto(e)),$("#footer").html(Partials.renderFooter(e))},fetchMoreSignatories:function(){var e=$("#signatory-table").data("id")+1;$("#signatory-table").data("id",e),Manifesto.fetchSignatories(e)},fetchSignatories:function(e){$.fetchJSON("signatories?page="+e).done(function(e){var t="";$.each(e,function(n){var r=n%3;r==0&&(t+="<tr>");var i=e[n];t=t+"<td>"+i.name+" ("+i.location+")"+"</td>",r==2&&(t+="</tr>")}),$("#signatory-table").append(t)})},switchLocale:function(){$("a#en, a#zh-cn, a#tr, a#es, a#de, a#fr-fr, a#ru-ru").on("click",function(){Manifesto.translate($(this).attr("id"))})},toggleSignForm:function(){Transitions.before(function(){$("#signatory-table, #manifesto, div#reading").hide(),$("div#sign").show(),Transitions.after()}),Transitions.infiniteUnscroll()},toggleReading:function(){Transitions.before(function(){$("#signatory-table, #manifesto, div#sign").hide(),$("div#reading").show(),Transitions.after()}),Transitions.infiniteUnscroll()}};