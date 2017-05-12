jQuery(document).on('hide_the_fruit', function(){
	
	jQuery('.enc-me-fav-lists-container').show();

	jQuery('#em-save-list').tooltipster({
		contentCloning: true,
		interactive : true,
		trigger: 'click',
		functionReady : function(o, el){
			
			var tooltip = jQuery(el.tooltip);

			tooltip.find('#em-save-list-name').val('');
			tooltip.find('.licence-tick').hide();

			tooltip.find('#em-save-list-button').on('click', function(){
				
				tooltip.find('.tooltipster-box').LoadingOverlay('show', {zIndex: 999999999});

				var data = {
		      		"add_fav_list" : enq_me_get_added_ids('#sortable'),
		      		"user_id" : window.user_id,
		      		"package_name" : tooltip.find('#em-save-list-name').val()
				};
				enq_me_ajax(data, null, function(){
					tooltip.find('.licence-tick').show('medium');
					tooltip.find('.tooltipster-box').LoadingOverlay('hide');
				});
			
			});
		
		}
	
	});

	jQuery('#em-load-list').tooltipster({
		contentCloning: true,
		interactive : true,
		trigger: 'click',
		content: '.....',
		contentAsHTML : true,
		functionReady : function(o, el){
			var tooltip = jQuery(el.tooltip);
			tooltip.find('.tooltipster-box').LoadingOverlay('show', {zIndex: 999999999});

			var data = {
		      		"get_fav_list" : window.user_id
			};
			enq_me_ajax(data, function(responce){
				console.log(responce);

				var html = "<table cellpadding='3' style='border:1px'><thead><tr><th>List Name</th><th>Assets</th><th>Actions</th></tr></thead>";

				responce.forEach(function(element, index){
					html += "<tr data-ids='" + element.fav_list + "'>";
					html += "<td>" + element.list_name +"</td>";
					html += "<td>" + element.fav_list.length +"</td>";
					html += "<td> Load | Delete </td>";
					html +=	"</tr>";
				});

				html += "</table>";
				
				o.content(html);
				tooltip.find('.tooltipster-box').LoadingOverlay('hide');

			}, function(responce){
				console.log(responce);
			});
		}

	});

});