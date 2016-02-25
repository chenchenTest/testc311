	$(function() {
		var value= $("#testchenfei").val();
		function init(){
			$("#userStatusTable").DataTable().destroy();
			dataTable.initTable({
				"serverSide":true,
				"tableID":"#userStatusTable",
				//对每列设置排序规则
				//列的长度必须对应，如果表格有7列，必须写7个，否则会报错
				"columns": [
				            {
				    		  "data":"no"
				            },
				            {
				    		  "data":"loginId"
				            },
				            {
					    	   "data":"loginStatus"
					        },
				            {
				    		  "data":"callStatus"
				            },
				            {
						    	   "data":"onlineStatus"
						        },
					            {
					    		  "data":"lastLoginDate"
					            },{
				            	"data":"nothing"
				            }
		        ],
		      "url": path+"/management/userstatus?value="+value,
		      /* "order": [[1, "asc" ]], */
		      "bLengthChange":false
			});
			
			$("#userStatusTable_filter").find("label").eq(0).hide();
			
			var $array;
			$array=("<select id='onoff'>");
			$array+=("<option>ON</option>");
			$array+=("<option>OFF</option>");
			$array+=("<option>ALL</option>");
			$array+=("</select>");
			$("#userStatusTable_filter").append($array); 
			
			var $array_login;
			$array_login=("<select id='login'>");
			$array_login+=("<option>LOGIN IN</option>");
			$array_login+=("<option>LOGIN OUT</option>");
			$array_login+=("<option>ALL</option>");
			$array_login+=("</select>");
			$("#userStatusTable_filter").append($array_login);
			
			$("#onoff").val($("#onoffvalue").val());
			
		}
		
		init();
		
		$("#onoff").on("change",function(){
			$("#onoffvalue").val($("#onoff").val());
			$.getScript(path+'/resources/js/pfingo/user_status.js',function(){
				});
		})
	})
