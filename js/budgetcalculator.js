$(document).ready(function(){
			number = 0;

			$("#amount").keyup(function() {
				var $this = $(this);
				$this.val($this.val().replace(/[^\d.]/g, ''));        
			});

			$("#addanentry").click(function() {
					
				if($('#description').val() && $('#amount').val())
				{	
					number=number+1;
					$('#entries').show();
					description = $('#description').val();
					amount = $('#amount').val();
					type = $('#entrytype').val();
					if(type=="expense")
					{
						$("#entries").find('tbody').append('<tr><td>'+number+'</td><td>'+description+'</td><td class="debit">'+amount+'</td><td></td></tr>');        
					}
					else
					{
						$("#entries").find('tbody').append('<tr><td>'+number+'</td><td>'+description+'</td><td></td><td class="credit">'+amount+'</td></tr>');
					}
					$('#description').val('');
					$('#amount').val('');


					var totaldebit = 0;
					var totalcredit = 0;
					var savings = 0;

					$(".debit").each(function(){
						totaldebit = totaldebit + parseFloat($(this).text());
					});

					$(".credit").each(function(){
						totalcredit = totalcredit + parseFloat($(this).text());
					});

					savings = totalcredit-totaldebit;

					$('#summary').show();
					$("#totalincome").text(totalcredit+' CAD');
					$("#totalexpenses").text(totaldebit+' CAD');
					$("#savings").text(savings+' CAD');
				}
			});
		});