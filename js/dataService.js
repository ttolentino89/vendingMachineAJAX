let dataService = function () {
    let self = this;
    self.getItems = function(cb, error){
        $.ajax({
            url: "http://localhost:8080/items",
            method: "GET",
            headers: {
                "accept": "application/json"
            },
            success: cb,
            error: error
        });
    self.vendItem = function(amount, ID, cb, error){
        $.ajax({
            url: "http://localhost:8080/money/" + amount + "/item/" + ID,
            method: "GET",
            headers: {
                "accept": "application/json"
            },
            success: cb,
            error: error
        });
    }
    }
}

