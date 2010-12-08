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
var query1=db[obj1.collections].find({stock_symbol: obj1.stock, date: {$gte: time_range.start, $lte: time_range.end}},{stock_symbol:1, date:1, close:1, _id:0}).sort({date:1});
var query2=db[obj2.collections].find({stock_symbol: obj2.stock, date: {$gte: time_range.start,$lte: time_range.end}},{stock_symbol:1, date:1, close:1, _id:0}).sort({date:1});
var n1 =query1.count();
var n2 =query2.count();

var sumOfProducts = 0;//sum(x *y)
var sumOfX=0;
var sumOfY=0;
var sumOfSquareX=0;
var sumOfSquareY=0;
   
if (n1===n2){
    print(obj1.stock + " "+ obj2.stock +" ");
    while (query1.hasNext() && query2.hasNext())
    {
    var x = query1.next().close;
    var y = query2.next().close;
    sumOfProducts += x*y;
    sumOfX += x;
    sumOfY += y;
    sumOfSquareX += x*x;
    sumOfSquareY += y*y;
    print(x + " "+ y);
    }      
}

var base1 =(n1*sumOfSquareX)-(sumOfX*sumOfX);
var base2 =(n1*sumOfSquareY)-(sumOfY*sumOfY);
var r = (n1*sumOfProducts - sumOfX*sumOfY)/(Math.sqrt(base1*base2));
print("n1="+n1);
print("n2="+n2);
 print("r="+ r);
// print("The Pearson Correlation coefficient of "+query1[1].stock_symbol+" and "+ query2[1].stock_symbol+ " is " +r);
