const ds = new dataService();

// let itemID = 0;
// let item = {};
let currentBalance = 0;

function convertToFloat(string) {
    return parseFloat(currentBalance).toFixed(2);
}

//solves NaN problem....convert to string then back to number
function stringIntoDouble(string, decimals) {
    //count the number of characters in string
    let length = string.length;
    //decimals should be declared to two zero spaces (i.e. 2.00)
    let decimalPlaces = length - decimals;
    let zero = 0;
    let spaces = '';
    if (decimalPlaces < 0) {
        zero = decimalPlaces * -1;
        spaces = '0';
        decimalPlaces = 0;
    }
    //https://www.w3schools.com/jsref/jsref_substring.asp
    let beforeDecimal = string.substring(0, decimalPlaces);
    let afterDecimal = string.substring(decimalPlaces, length);
    //will never be more than 2
    for (let i = 0; i < zero - 1; i++) {
        spaces = spaces.concat('0');
    }
    //add zeros after decimal
    return beforeDecimal.concat('.', spaces, afterDecimal);
}

function addBalance(amount) {
    currentBalance += amount;
    //declare balance to string, convert back to number with 2 decimal spaces
    let output = stringIntoDouble(currentBalance.toString(), 2);
    $("#balanceOutput").val(output);
}

function onClickSelectItem(e) {
    e.preventDefault();
    let item = $(this);
    itemID = item.data("itemid");
    $("#itemIDOutput").val(itemID);
};

// function getItem() {
//     e.preventDefault();
//     let itemID = element.getElementsByClassName('text-left')[0].innerHTML;
//     $("#itemIDOutput").val(itemID);
// };


function logError(err) {
    $("#messageOutput").val(err.responseJSON.message);
    // calculateChange(currentBalance);
}

function getItemsSuccess(item) {
    $("#items").empty();
    for (let i = 0; i < item.length; i++) {
        let itemButtons =
            `<div class="vendingItem col-md-4" data-itemID="${item[i].id}">
            <button ID="itemButton"><p class="text-left">${item[i].id}</p>
            <p class="text-center">${item[i].name}</p>
            <p class="text-center">$${item[i].price}</p>
            <p class="text-center">Quantity Left: ${item[i].quantity}</p></button>
        </div>`;
        $("#items").append(itemButtons);
        // $().click(function () {
        //     $("#inputItem").val(id);
        // });
        // return item;
    }
}

  
function vendItemSuccess(response) {
    $("#messageOutput").val("Thanks for your purchase!");
    $("#changeOutput").val(
        "Quarters: " + response.quarters +
        " Dimes: " + response.dimes +
        " Nickels: " + response.nickels
    );
    currentBalance = 0;
    $("#balanceOutput").val(0.00);
}

function resetForms() {
    $("#balanceOutput").val("");
    $("#messageOutput").val("");
    $("#itemIDOutput").val("");
    $("#changeOutput").val("");
}

function calculateChange(currentBalance) {
    let quarters = Math.floor(currentBalance / 25);
    currentBalance = currentBalance - (quarters * 25);
    let dimes = Math.floor(currentBalance / 10);
    currentBalance = currentBalance - (dimes * 10);
    let nickels = Math.floor(currentBalance / 5);
    currentBalance = currentBalance - (nickels * 5);
    $("#changeOutput").val(
        "Quarters: " + quarters +
        " Dimes: " + dimes +
        " Nickels: " + nickels
    );
}

$(document).ready(function () {
    // currentBalance = 0;
    itemID = 0;
    resetForms();
    $("#balanceOutput").val(0.00);
    ds.getItems(getItemsSuccess, logError);
    // ds.getItems(createItemButtons, logError);
    // createItemButtons();
    $("#addDollar").click(function() {
        addBalance(100);
    })
    $("#addQuarter").click(function() {
        addBalance(25);
    })
    $("#addDime").click(function() {
        addBalance(10);
    })
    $("#addNickel").click(function() {
        addBalance(5);
    })
    $(document).on("click", ".vendingItem", onClickSelectItem);
    // $("#itemButton").click(function() {
    //     let itemID = document.querySelector(".text-left");
        // $('#inputItem').val(itemID);
    $("#purchaseButton").click(function() {
        let amount = parseFloat(stringIntoDouble(currentBalance.toString(), 2));
        // let ID = $("itemIDOutput").val();
        ds.vendItem(amount, itemID, vendItemSuccess, logError);
        // calculateChange(currentBalance);
    })
    $("#changeButton").click(function() {
        calculateChange(currentBalance);
        currentBalance = 0;
        //reset balance back to 0 or else previous amount still displays after change return
        $("#balanceOutput").val(0.00);
    })
    $("h1").click(function() {
        resetForms();
    });
});