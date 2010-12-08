//Shulin Kang
use stocks_yahoo_NYSE;
//input the stock information right here; 
//The first stock information;
var obj1={
  collections: "C_prices",
  stock: "CC"
};

//The second stock information;
var obj2={
  collections: "A_prices",
  stock: "AA"
};

//The time range you want to analyze;
var time_range={
 start: "2004-02-10",
 end: "2004-12-01"
};

//define two query stated
var query1=db[obj1.collections].find({stock_symbol: obj1.stock, date: {$gte: time_range.start, $lte: time_range.end}},{stock_symbol:1, date:1, close:1, _id:0}).sort({date:1}).toArray();
var query2=db[obj2.collections].find({stock_symbol: obj2.stock, date: {$gte: time_range.start,$lte: time_range.end}},{stock_symbol:1, date:1, close:1, _id:0}).sort({date:1}).toArray();
var n =query1.length;
var n2 =query2.length; 
var sumOfProducts = 0;//sum(x *y)
var sumOfX=0;
var sumOfY=0;
var sumOfSquareX=0;
var sumOfSquareY=0;
   
if (n===n2){
   print("Date "+ query1[1].stock_symbol + " "+ query2[1].stock_symbol +" ");
    for (var i=0; i<n; i++)
    {
   var x = parseFloat(query1[i].close);
   var y = parseFloat(query2[i].close);
   sumOfProducts += x*y;
   sumOfX += x;
   sumOfY += y;
   sumOfSquareX += x*x;
   sumOfSquareY += y*y;
   print(query1[i].date + " "+ query1[i].close + " "+ query2[i].close);
    }
}
else {print("We couldn't compute for the two stocks are not paired in the selected time");};
var base1 =(n*sumOfSquareX)-(sumOfX*sumOfX);
var base2 =(n*sumOfSquareY)-(sumOfY*sumOfY);
print("Number of " + query1[1].stock_symbol +" is "+ n);
print("Number of " + query2[1].stock_symbol +" is "+ n2)
var r = (n*sumOfProducts - sumOfX*sumOfY)/(Math.sqrt(base1*base2));
 print("r="+ r);
 print("The Pearson Correlation coefficient of "+query1[1].stock_symbol+" and "+ query2[1].stock_symbol+ " is " +r);
