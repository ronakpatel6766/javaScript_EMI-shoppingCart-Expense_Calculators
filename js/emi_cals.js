
$(document).ready(function() {
    $("a_loanAmount").val("");
    $("a_interestRate").val("");
    $("a_nofMonth").val("");
    
    $("#a_result").click(function(e) {
    var amount = parseFloat($("#a_loanAmount").val());
    var interest = parseFloat($("#a_interestRate").val());
    var month = parseInt($("#a_nofMonth").val());
    
    if(!$.isNumeric(amount)){
        alert("Please enter numbers only.");
    }
    else if(!$.isNumeric(interest)){
        alert("Please enter numbers only.");
    }
    else if(!$.isNumeric(month)){
        alert("Please enter numbers only.");
    }
        
    var principal = parseFloat(amount);
    var c_interest = parseFloat(interest)/100/12;
    var c_payment = parseFloat(month);
        
    var x = Math.pow(1 + c_interest, c_payment);
        var monthly = (principal * x * c_interest)/(x-1);
        var monthlyPayment = monthly.toFixed(2);
        
    var totalInterest = (monthly * c_payment - principal).toFixed(2);
        
    var totalPayment = (monthly * c_payment).toFixed(2);
        
    //show result;
    
        $("#r1").html("&#36;"+monthlyPayment);
        $("#r2").html("&#36;"+totalInterest);
        $("#r3").html("&#36;"+totalPayment);
});
});



