/**
 * 删除联系人
 */
function deleteContacts(deleteURL, refreshURL) {
	
	 $.messager.model = { 
		        ok:{ text: "Ok", classed: 'btn-confirm' },
		        cancel: { text: "Close", classed: 'btn-default' }
		      };
	 $.messager.confirm("Delete Contact", "Are you sure you want to delete this contact?", function() { 
			$.ajax({
				url : deleteURL,
				type : "get",
				dataType : "json",
				success : function(msg) {
					if (msg == true) {
						refreshData(refreshURL);
					} else {
						showPannelInfo("gnumInfoPannel",
								"Delete contacts failed", "info");
					}
				}
			});
	      });

}