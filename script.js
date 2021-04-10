document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelector('.cards');
    productes.forEach(value => {
        cards.innerHTML += `<div class="card">
        <div class="card_img"><img src="template/cards/${value.img}" alt=""></div>
        <div class="card_about">
            <div class="card_about_top">
                <p class="producte_name">${value.name}</p>
                <p class="producte_time">${value.time}</p>
            </div>
            <div class="card_about_buttom">
                <div class="stars_before">
                    <p class="stars">${value.rate}</p>
                </div>
                <p class="price">От ${value.price}${value.currency} • Пицца</p>
            </div>
        </div>
            <div class="add_to_cart" data-id="${value.id}" data-price="${value.price}" data-name="${value.name}" data-time="${value.time}" data-rate="${value.rate}" data-img="${value.img}" data-currency="${value.currency}">
                Добавить в корзину<i class="fas fa-cart-plus"></i> 
            </div>
        </div>`
    });
    
    let cart_base = [];
    if(localStorage.getItem('cart-string') != null){
        cart_base = JSON.parse(localStorage.getItem('cart-string'));
        
    }
    
    const add_to_cart = document.querySelectorAll('.add_to_cart');
    const open_cart = document.querySelector('.cart');
    const cart_all_price = document.querySelector('.modal_footer_left span');
    const count =  document.querySelector('.cart span');
    const modal = document.querySelector('.modal_wrapper');
    const modal_close = document.querySelector('.modal_close');
    
    const update_cart = (cart_base, data_id, math_count) =>{
        cart_base.forEach(value => {
            if(value.id == data_id){
                value.count = math_count;            
            };
        });
        update_cart_sum(cart_base);
        localStorage.setItem('cart-string', JSON.stringify(cart_base));
    };
    
    const update_cart_sum = (cart_base)=>{    
        let cart_sum = 0;
        for(let i = 0; i < cart_base.length; i++) {
            cart_sum += cart_base[i].price * cart_base[i].count;
        };
        cart_all_price.innerText = cart_sum;
        count.innerText = cart_base.length;
    };
    
    const remove_from_cart = (cart_base, data_id) =>{
        cart_base.forEach((value,index) => {
            console.log(data_id);
            console.log(value);
            if(value.id == data_id){
                cart_base.splice(index, 1);
            };
        });
        creatItemToCart(cart_base)
    };
    const creatItemToCart = (cart_base) =>{
        
        const modal_main = document.querySelector('.modal_main');
        modal_main.innerHTML = '';
        cart_base.forEach(value => {
            modal_main.innerHTML += `<div class="cart_item">
                <div class="cart_item_left">
                    <div class="cart_item_name">${value.name}</div>
                    <div class="cart_item_price">${value.price} ${value.currency}</div>  
                </div>
                <div class="cart_item_right" data-id="${value.id}">    
                    <button class="cart_item_minus">-</button>
                    <p class="count">${value.count}</p>
                    <button class="cart_item_plus">+</button>
                </div>
                <div class="remove_item_cart">
                    <i class="fas fa-trash-alt delete"></i>
                </div>
            </div>`;
        });
        const button_delete = document.querySelectorAll('.remove_item_cart');
        update_cart_sum(cart_base);
        const cart_item_plus_button = document.querySelectorAll('.modal_main .cart_item_plus');
        cart_item_plus_button.forEach(value => {
            value.addEventListener('click', function(){
                let data_id = this.parentElement.getAttribute('data-id');
                let plus_count = Number(this.previousElementSibling.innerText);
                this.previousElementSibling.innerText = ++plus_count;
                update_cart(cart_base, data_id, plus_count)
            });
        });
        const cart_item_minus_button = document.querySelectorAll('.modal_main .cart_item_minus');
        cart_item_minus_button.forEach(value => {
            value.addEventListener('click', function(){
                let data_id = this.parentElement.getAttribute('data-id');
                let minus_count = Number(this.nextElementSibling.innerText);
                if(minus_count > 1){
                    this.nextElementSibling.innerText = --minus_count;   
                    update_cart(cart_base, data_id, minus_count);
                };
            });
        });
        button_delete.forEach(value => {
            value.addEventListener('click', function(){
                delete_id = Number(value.previousElementSibling.getAttribute('data-id'));  
                remove_from_cart(cart_base, delete_id);
            });
        });
        localStorage.setItem('cart-string', JSON.stringify(cart_base));
    };
    creatItemToCart(cart_base);






































    add_to_cart.forEach(value => {
        value.addEventListener('click', function(){
            const item = {
                name : value.getAttribute('data-name'),
                price : Number(value.getAttribute('data-price')),
                time : value.getAttribute('data-time'),
                rate : Number(value.getAttribute('data-rate')),
                currency : value.getAttribute('data-currency'),
                count : 1,
                id : Number(value.getAttribute('data-id')),
            };
            let bool = true;
            cart_base.forEach(value => {
                if(item.id == value.id){
                    bool = false;
                    value.count++;
                }
            });
            if(bool){
                cart_base.push(item);
            }
            creatItemToCart(cart_base);
        });
    }); 
    open_cart.addEventListener('click', () => {
        modal.style.display = "flex";
    });
    modal_close.addEventListener('click', () => {
        modal.style.display = "none";
    });
});