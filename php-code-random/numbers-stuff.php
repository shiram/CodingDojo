<?php
/**
 * playin eith numbers
 */

/**
 * takes an array of numbers 0 -9
 * computes sum of numbers with zero replaced by 1-9
 */
 function zeroPlaceholder(array $numbers) {
     foreach($numbers as $num) {
         if ($num == 0) continue;
         $numbers[0] = $num;
         $sumLine = array_sum($numbers);
         echo "0 holding ".$num." === ".$sumLine."\n";
     }
 }

 function dynamicPlaceholder(array $numbers) {
    foreach($numbers as $num) {
        if ($num == 5) continue;
        $numbers[5] = $num;
        $sumLine = array_sum($numbers);
        echo "5 holding ".$num." === ".$sumLine."\n";
    }
 }

 $data = [0,1,2,3,4,5,6,7,8,9];

 zeroPlaceholder($data);

 dynamicPlaceholder($data);