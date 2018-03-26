function MenuChoice()
{
    if(document.getElementById("Menu").value == "Display Customer List")
    {
        document.getElementById("custlist").style.visibility = "visible";
        document.getElementById("custordhis").style.visibility = "hidden";
        document.getElementById("custlioford").style.visibility = "hidden";
        document.getElementById("custlist").style.display = "block";
        document.getElementById("custordhis").style.display = "none";
        document.getElementById("custlioford").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Display Customer Order History")
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custordhis").style.visibility = "visible";
        document.getElementById("custlioford").style.visibility = "hidden";
        document.getElementById("custlist").style.display = "none";
        document.getElementById("custordhis").style.display = "block";
        document.getElementById("custlioford").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Display List of Orders")
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custordhis").style.visibility = "hidden";
        document.getElementById("custlioford").style.visibility = "visible";
        document.getElementById("custlist").style.display = "none";
        document.getElementById("custordhis").style.display = "none";
        document.getElementById("custlioford").style.display = "block";
    }
   else
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custordhis").style.visibility = "hidden";
        document.getElementById("custlioford").style.visibility = "hidden";
        document.getElementById("custlist").style.display = "none";
        document.getElementById("custordhis").style.display = "none";
        document.getElementById("custlioford").style.display = "none";
    }
}

function GetListHist()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    
    objRequest.open("GET",url,true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
    
    for(count=0; count < result.GetAllCustomersResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("custlistdis").innerHTML = displaytext;
}

function GetOrdHis()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custid").value;
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput1(output);
        }
    }
    
    objRequest.open("GET",url,true);
    objRequest.send();
}

function GenerateOutput1(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Product Name</th><th>Total Product Quantity Ordered</th></tr>";
    
    for(count=0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("ordhisdis").innerHTML = displaytext;
}

function GetListOrd()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid2").value;
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput2(output);
        }
    }
    
    objRequest.open("GET",url,true);
    objRequest.send();
}

function GenerateOutput2(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th><th>Shipping Date</th></tr>";
    
    for(count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("custlioforddis").innerHTML = displaytext;
}