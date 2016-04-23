moment.lang('es');

var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date());
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
	datetime = $('span');
    update();
    setInterval(update, 1000);

	var $product = $("input[type='text']"),
		$price = $product.next(),
		$quantity = $price.next(),
		btnDelete = "<button class='delete'>Remove</button>",
		totalItem = 0,
		subtotal = 0,
		tax = 0,
		total = 0;

		$("button").click(function(){

			$("tbody tr td[colspan='5']").remove();
			console.log($price.val());
			console.log($product.val());
			totalItem = $price.val() * $quantity.val();
			var newRow = "<tr><td>"+$product.val()
						+"</td><td>"+$price.val()+"</td><td>"
						+$quantity.val()+"</td><td>"+totalItem+"</td><td>"+btnDelete+"</tr>";
			$("tbody").append(newRow);
			subtotal+=totalItem;
			tax = (subtotal*0.15).toFixed(2);
			total = parseFloat(subtotal) + parseFloat(tax);
			$("tfoot tr").eq(0).children().eq(1).text(subtotal);
			$("tfoot tr").eq(1).children().eq(1).text(tax);
			$("tfoot tr").eq(2).children().eq(1).text(total);
			console.log(total);
			$product.val("");
			$price.val("");
			$quantity.val("");

		});

	$(document).on("click",".delete",function(){
		var totalItemRemove = $(this).parent().prev().text();
		$(this).parentsUntil("tbody").remove();
		total -= parseFloat(subtotal) + parseFloat(tax);
		tax -= subtotal * 0.15;
		subtotal -= totalItemRemove;
		$("tfoot tr").eq(0).children().eq(1).text(subtotal);
		$("tfoot tr").eq(1).children().eq(1).text(tax);
		$("tfoot tr").eq(2).children().eq(1).text(total);
		if(total===0){
			$("tbody").append("<tr><td colspan='5'>No items</td></tr>");
		}
	});

	$("tfoot button").click(function(){
		$("tbody").empty();
		$("tbody").append("<tr><td colspan='5'>No items</td></tr>");
		subtotal = 0;
		tax = 0;
		total = 0;
		$("tfoot tr").eq(0).children().eq(1).text(subtotal);
		$("tfoot tr").eq(1).children().eq(1).text(tax);
		$("tfoot tr").eq(2).children().eq(1).text(total);
	})

});