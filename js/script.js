$(document).ready(function(){
	var $product = $("input[type='text']");
	var $price = $product.next();
	var $quantity = $price.next();
	var btnDelete = "<button class='delete'>Delete</button>";
	var totalItem = 0;
	var total = 0;

	$("button").click(function(){
		totalItem = $price.val() * $quantity.val();
		var newRow = "<tr><td>"+$product.val()
					+"</td><td>$"+$price.val()+"</td><td>"
					+$quantity.val()+"</td><td>"+totalItem+"</td><td>"+btnDelete+"</tr>";
		$("tbody").append(newRow);
		
		$("tfoot tr td").eq(1).text(total+=totalItem);
		$product.val("");
		$price.val("");
		$quantity.val("");
	});

	$(document).on("click",".delete",function(){
		var totalItemRemove = $(this).parent().prev().text();
		$(this).parentsUntil("tbody").remove();
		$("tfoot tr td").eq(1).text(total -= totalItemRemove);
	});

});