var STATE = {
	showCart: false,
}    

var d = document,

        itemBox = d.querySelectorAll('.item_box'), // блок каждого товара

        cartCont = d.getElementById('cart_content'); // блок вывода данных корзины

    // Функция кроссбраузерной установка обработчика событий

    function addEvent(elem, type, handler){

      if(elem.addEventListener){

        elem.addEventListener(type, handler, false);

      } else {

        elem.attachEvent('on'+type, function(){ handler.call( elem ); });

      }

      return false;

    }

    // Получаем данные из LocalStorage

    function getCartData(){

      return JSON.parse(localStorage.getItem('cart'));

    }

    // Записываем данные в LocalStorage

    function setCartData(o){

      localStorage.setItem('cart', JSON.stringify(o));

      return false;

    }

    // Добавляем товар в корзину

    function addToCart(e){

      this.disabled = true; // блокируем кнопку на время операции с корзиной

      var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет


          parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"

          itemId = this.getAttribute('data-id'), // ID товара

          itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара

          itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара

	var imgGood = document.querySelector('.img_goods').innerHTML;


	//var amountOfGoods =

      if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству

        cartData[itemId][3] += 1;

      } else { // если товара в корзине еще нет, то добавляем в объект

        cartData[itemId] = [imgGood, itemTitle, itemPrice, 1, itemId];

      }

      if(!setCartData(cartData)){ // Обновляем данные в LocalStorage

        this.disabled = false; // разблокируем кнопку после обновления LS

      }

        amountOfGoods();

        if(flag){

            openCart(e);

        }

     return false;

    }

    // Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"

    for(var i = 0; i < itemBox.length; i++){

      addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);

    }

    // Открываем корзину со списком добавленных товаров

    var flag = false;

    function openCart(e){

	
      var cartData = getCartData() || {}, // вытаскиваем все данные корзины

          totalItems = '';

	var totalSum = 0;

      // если что-то в корзине уже есть, начинаем формировать данные для вывода

      if(Object.keys(cartData).length){

        totalItems = '<table class="table"><tr><th></th><th>Наименование</th><th>Цена</th><th>Кол-во</th>' +

                     '<th>Артикул</th></th></tr>';

        for(var items in cartData){

          totalItems += '<tr class="delete_item_box">';

          for(var i = 0; i < cartData[items].length; i++){

            totalItems += '<td>' + cartData[items][i] + '</td>';

          }

	totalSum += cartData[items][2]*cartData[items][3]

          totalItems += '<td></i><i class="fa fa-times delete_item"></i></td></tr>';

        }

	

        totalItems += '<tr><td></td><td></td><td><b>Итого<b></td><td>' + totalSum + '</td></table><div class="clear-cart"><button class="btn btn-danger" id="clear_cart">Очистить корзину</button></div>';

        cartCont.innerHTML = totalItems;

          addHandlers();

	/* Очистить корзину */

    addEvent(d.getElementById('clear_cart'), 'click', function(e){

console.log('GOOD');
      localStorage.removeItem('cart');


      cartCont.innerHTML = 'Корзина очишена.';

	
        amountOfGoods();

    });
      } else {

        // если в корзине пусто, то сигнализируем об этом

        cartCont.innerHTML = '<div class="non_item_message"><span>В корзине пусто!</span>' +
	'<a href="index.html"><button id="checkout" class="cart-btn btn btn-outline-success my-2 mr-sm-2" type="button">' +
	'Перейти к покупкам</button></div></a>';

      }

      flag = true;



      return false;

    }


    console.log(cartCont.innerHTML);



    /* Открыть корзину */

    addEvent(d.getElementById('checkout'), 'click', showCart);


    




    function amountOfGoods() {
 // Счетчик товаров
        var counter = 0;

        var cartData = getCartData() || {};

        if(Object.keys(cartData).length) {

            for (var items in cartData) {

                counter += cartData[items][3];

            }


            d.getElementById('checkout').innerHTML = 'Корзина <span class="badge badge-light">' +

                counter + '</span>';

        } else {

            d.getElementById('checkout').innerHTML = 'Корзина';

        }
        return false;


    }

amountOfGoods();

    // Удаление элемента из карзины
    function deleteItemOfCartList(e) {

        var tableCol = this.parentNode.cellIndex - 1;

        var tableRow = this.parentNode.parentNode.rowIndex;

        var articul = e.target.closest('table').rows[tableRow].cells[tableCol].innerHTML;

        var cartData = getCartData();

        if(cartData.hasOwnProperty(articul)){

            delete cartData[articul];

            setCartData(cartData);

            amountOfGoods();

        }

        console.log(cartData);

        openCart(e);

        return false;

    }
function addHandlers() {



    var deleteItemBox = d.querySelectorAll('.delete_item_box');


	// Обработчик на все крестики
    for (var i = 0; i < deleteItemBox.length; i++) {

        addEvent(deleteItemBox[i].querySelector('.delete_item'), 'click', deleteItemOfCartList);

    }

}

 // Паказ карзины
function showCart(e) {

    	e.stopPropagation();
	var cart = document.querySelector('.cart-content');
    if( STATE.showCart ) {
	cart.style.display = "none";
	
      	STATE.showCart = false;
	
    } else {
var button = e.target;
var closest = button.closest('.cart-btn').getBoundingClientRect();
console.log(closest);
cart.style.top = closest.bottom + 20 + 'px';

//console.log(cart.style.top);
//console.log(closest.bottom);

openCart(e);
cart.style.display = "block";
  STATE.showCart = true;

	}
	
}




