/**
 * Created by dengshuang.
 */
$(function(){
    $("form .form-control").on("blur",function(){
        $("form button.close").css("visibility","hidden");
        //$(this).css("color","#05CDB7")
        $("form .inBtn").removeClass("addBtn")
    })

	$("form .inBtn").hover(function(){
		$("form .inBtn img").attr("src",$path + "/resources/images/support/searchrollover.png")
	},function(){
		$("form .inBtn img").attr("src",$path +"/resources/images/support/search.png")
	});
    
    $(".box1").on("click",function(){
    	$("#searchContent").css("display","block");
    	$(".box1").css("color","#00A593");
    	$("#searchContentUsage").css("display","none");
    	$(".box2").css("color","#CCCCCC");
    });
    
    $(".box2").on("click",function(){
    	$("#searchContentUsage").css("display","block");
    	$(".box2").css("color","#00A593");
    	$("#searchContent").css("display","none");
    	$(".box1").css("color","#CCCCCC");
    });
})

var support = {
	allSearch : function(){
		var searchValue = $("#searchInput").val();
		/*if (searchValue.length==0){
		    alert('搜索关键词未填写！');
		    return false;
		  }*/
		  searchValue=encode(searchValue);
		  var obj=document.getElementById("searchContent");
		  
		  if($(obj).attr("style")=="display: none;"||obj==="undefined"){
			  obj=document.getElementById("searchContentUsage");
		  }
		  var t=obj.innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi,"$1");
		  obj.innerHTML=t;
		  var cnt=loopSearch(searchValue,obj);
		  t=obj.innerHTML
		  var r=/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g
		  t=t.replace(r,"<span class='highlight'>$1</span>");
		  obj.innerHTML=t;
	}
}

	function encode(s){
	  return s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/([\\\.\*\[\]\(\)\$\^])/g,"\\$1");
	}
	function decode(s){
	  return s.replace(/\\([\\\.\*\[\]\(\)\$\^])/g,"$1").replace(/>/g,">").replace(/</g,"<").replace(/&/g,"&");
	}
	
	function loopSearch(s,obj){
		  var cnt=0;
		  if (obj.nodeType==3){
		    cnt=replace(s,obj);
		    return cnt;
		  }
		  for (var i=0,c;c=obj.childNodes[i];i++){
		    if (!c.className||c.className!="highlight")
		      cnt+=loopSearch(s,c);
		  }
		  return cnt;
		}
		function replace(s,dest){
		  var r=new RegExp(s,"g");
		  var tm=null;
		  var t=dest.nodeValue;
		  var cnt=0;
		  if (tm=t.match(r)){
		    cnt=tm.length;
		    t=t.replace(r,"{searchHL}"+decode(s)+"{/searchHL}")
		    dest.nodeValue=t;
		  }
		  return cnt;
		}
