<?php

/**
 * PHP Functions
 */

 /**
  * takes a array of ints and returns array 
  * containing only odd numbers.
  * can change return to !($v & 1) for even numbers.
  */
 function simpleFunction(array $arg) {
     $evens = array_filter($arg, function ($v) {
         return ($v & 1);
     });

     return $evens;
 }

 $data = [0,1,2,3,4,5,6,7,8,9];

 $res = simpleFunction($data);

//  var_dump($res);


/**
 * Testing inner functions
 */
function globalFunction(array $data) {
    $odds = simpleFunction($data);

    /**
     * meh function, inner function
     */
    function sumNumbers(array $numbers) {
        $total = 0;
        foreach($numbers as $num) {
            $total += $num; 
        }
        return $total;
    }

    return sumNumbers($odds);
}


//call the outer function
$res = globalFunction($data);

//calling inner function from global space- works
$innerRes = sumNumbers($data);

 var_dump($innerRes);
