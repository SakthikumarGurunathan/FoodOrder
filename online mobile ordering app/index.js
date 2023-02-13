import { menuArray } from './data.js'
let chosenItems = []
const yourOrder = document.querySelector('.your-order')
const totalPrice = document.querySelector('.total-price')
const orderFinish = document.querySelector('.order-finish')
const completeOrder = document.getElementById('complete-order')
const modal = document.getElementById('card-details-modal')
const cardForm = document.getElementById('card-form')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-order'){
        complete()
    }
})

cardForm.addEventListener('submit', function(e){
    e.preventDefault()
    const cardFormData = new FormData(cardForm)
    const fullName = cardFormData.get("fullName")
    
    setTimeout(() => {
            modal.classList.add("display-none")
            yourOrder.classList.add("display-none")
            cardForm.classList.add("display-none")
            modal.style.background = "none"
            orderFinish.classList.remove("display-none")
        }, 1000);
        
        orderFinish.innerHTML = `
            
                    <p>Thanks, ${fullName}! Your order is on its way!</p>
            
            `
})

function handleAddClick(itemId){
    const itemObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    
    itemObj.count++
    itemObj.sum = itemObj.price * itemObj.count
    if(!chosenItems.includes(itemObj)){
        chosenItems.push(itemObj)
    }
    ordeRender()
    getPrice()
}

function handleRemoveClick(itemId){
    const itemObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    
    itemObj.count--
    itemObj.sum = itemObj.price * itemObj.count
    
    ordeRender()
    getPrice()
}

function ordeRender() {
    let ordeRenders = ``
    yourOrder.classList.remove('display-none')
    chosenItems.forEach(function(item){
        ordeRenders += `
            <div class="order-titles">
                <h1 class="item-name">${item.name}</h1>
                <span class="item-count">x${item.count}</span>
                <p class="item-remove" data-remove="${item.id}">remove</p>
                <div class="price">
                    <h2 class="price-h2">$${item.price}</h2>
                </div>
            </div>
        `
    })
    document.querySelector('.order-details').innerHTML = ordeRenders
}

function getPrice(){
    let price = 0
    let priceHtml = ``
    
    chosenItems.forEach(function(item){
        price += item.sum
    })
    
    priceHtml += `
        <h1 class="price-h1">Total price:</h1>
        <h2 class="price-h2">$${price}</h2>
    `
    totalPrice.innerHTML = priceHtml
}

completeOrder.addEventListener('click', function(){
    
})

function getItemHtml() {
    let itemHtml = ``
    
    menuArray.forEach(function(items){
        itemHtml += `
            <div class="first-tier">
                <div class="emojis">
                    <h1>${items.emoji}</h1>
                </div>
                <div class="n-i-p">
                    <h1 class="item-name">${items.name}</h1>
                    <p class="item-ingredients">${items.ingredients}</p>
                    <h2 class="price-h2">$${items.price}</h2>
                </div>
                <div class="add">
                    <button class="plus-button" data-add="${items.id}">+</button>
                </div>
            </div>
        `
    })
    return itemHtml
}

function complete(){
    return modal.style.display = "block"
}

function render() {
    document.getElementById('menu').innerHTML = getItemHtml()
}

render()
