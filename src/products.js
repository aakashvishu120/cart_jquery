var products = [
    {"id":101,"name":"Basket Ball","image":"basketball.png","price":150},
    {"id":102,"name":"Football","image":"football.png","price":120},
    {"id":103,"name":"Soccer","image":"soccer.png","price":110},
    {"id":104,"name":"Table Tennis","image":"table-tennis.png","price":130},
    {"id":105,"name":"Tennis","image":"tennis.png","price":100}
];

storedInCart = []
var PriceCalc  =0
for(var i =0 ; i < products.length ; i++)
{
    products[i].quantity = 0;
}

display()

function display()
{
    var html = "";
  
    for(var i =0 ; i< products.length ; i++)
    {
     
        html+='<div id="'+products[i].id+'" class="product">\
				<img src="images/'+products[i].image+'">\
				<h3 class="title"><a href="#">Product '+products[i].id+'</a></h3>\
				<span>Price: '+products[i].price+'</span>\
				<a class="add-to-cart" href="#" data-pid = "'+products[i].id+'">Add To Cart</a>\
			</div>'
    }
  
    $('#products').html(html);
   
}


$(document).ready(function(){
    $("a").click(function(){
        console.log("You've clicked the link.");
        var pid = $(this).data('pid');
            var product = getProduct(pid);
         if(Ispresent(pid))
         {
              increaseQuantity(product)
              increasePrice(product)
         }else{
             storedInCart.push(product)
             increaseQuantity(product)
             increasePrice(product)
         }        
        
        display2()
    });
 });

 function Ispresent(pid)
 {
    for(var i =0 ; i < storedInCart.length ; i++)
    {
        if(pid == storedInCart[i].id)
        {
            return true;         
        }
    }
    return false;
 }

 function increaseQuantity(product)
 {
     product.quantity = product.quantity + 1
 }


 function increasePrice(product)
 {
    PriceCalc = PriceCalc + product.price
 }


function display2() {
$("#id1").html("<h1>Items Added in CART</h1>")
    var html = '';
    html += '<table id = "customers"><tr><th>ID</th><th>NAME</th><th>PRICE</th><th>Quantity</th><th>Action</th><th></th></tr>';
    for(i =0 ; i < storedInCart.length ; i++)
    {
        var priceC = parseInt(storedInCart[i].price);
        var quanC = parseInt(storedInCart[i].quantity);
        var calc = priceC * quanC
        html += '<tr><td>'+storedInCart[i].id+'</td><td>'+storedInCart[i].name+'</td><td>'+calc+ '</td><td>'+storedInCart[i].quantity+'</td><td><button class="editclass" data-pid2 = "'+storedInCart[i].id+'">ADD</button></td> <td><button id="delclass" data-did = "'+storedInCart[i].id+'">DELETE</button></td></tr>';
       // PriceCalc +=priceC
    }
    
    html += '</table><br>'
   // html += '<h1>toal price'+price+'</h1>'
   html += '<p>'+PriceCalc+'</p>'
    html +='<button id="emptycart">EMPTY CART</button>';
    
    $("#footer").html(html)   
    // $("#id3").html('<p>total price = '+PriceCalc+'</p>') 
}


function getProduct(pid)
{
    for(var i =0 ; i < products.length ; i++)
    {
        if(pid == products[i].id)
        {
            return products[i];
        }
    }
}

$("body").on("click","#delclass" ,function(e){
    var did = $(this).data('did');
    var product = getProduct(did);
    for(var  i =0 ; i < storedInCart.length ; i++)
    {
        if(did == storedInCart[i].id)
        {         
                PriceCalc = PriceCalc -  storedInCart[i].quantity * storedInCart[i].price
                $(this).parents('tr').remove();
                storedInCart.splice(i, 1);     
        }
    }
    display2()
  });


$("body").on("click","#emptycart" ,function(e){
    storedInCart = []
    PriceCalc =0 
    display2()
  });


$("body").on("click",".editclass" ,function(e){
    console.log("im inside edit functoin");
    var pid = $(this).data('pid2');
    var product = getProduct(pid);
    console.log("in edit fucntoin pid = "+pid);
    var Q = "";
    for(var i =0 ; i < storedInCart.length ; i++)
    {
        if(pid == storedInCart[i].id)
        {
            Q = storedInCart[i].quantity
        }
    }

    $(this).parents('tr').find('td:eq(3)').html("<input name='edit_quantity' value='"+Q+"'>");
    $(this).parents('tr').find('td:eq(4)').prepend("<button type='button'  class='updatebutton' data-pid3 = '"+pid+"'>Update</button>");
    $(this).hide()
  });



  $('body').on('click','.updatebutton',function() {
    var updated_quantity=$(this).parents('tr').find("input[name='edit_quantity']").val();
console.log("after press update button value wil be"+updated_quantity)
//console.log()

var pid = $(this).data('pid3');
var product = getProduct(pid);
console.log("in update fucntoin pid = "+pid);

for(var  i =0 ; i < storedInCart.length ; i++)
{
    if(pid == storedInCart[i].id)
    {         
            // var temp =  storedInCart[i].quantity
            // var temp2 = storedInCart[i].price
            // console.log("updateed quantity"+temp)
            // console.log("updateed price"+temp2)
            PriceCalc = PriceCalc + storedInCart[i].price * updated_quantity
           console.log("updateed quantity"+PriceCalc)
               
    }
}

for(var i =0 ; i < storedInCart.length ; i++)
{
    if(storedInCart[i].id == pid)
    {
        storedInCart[i].quantity = parseInt(storedInCart[i].quantity)+ parseInt(updated_quantity) 
    }
}

    $(this).parents('tr').find('.editclass').show();
    $(this).parents('tr').find('.updatebutton').remove();
    display2()
    
  });