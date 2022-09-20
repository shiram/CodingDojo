<?php

/**
 * Array stuff
 */

 function stringToAssociativeArray(array $data) {
    $newArray = [];
    for ($i = 0; $i < sizeof($data); $i++) {
       $token = explode('.', $data[$i]);
       if (array_key_exists($token[0], $newArray)) {
          array_push($newArray[$token[0]], $token[1]);
       } else {
          $newArray[$token[0]] = array($token[1]);
       }
    }
    return $newArray;
 }

 $data = ["claims" => [
    "site-visits.purpose",
    "site-visits.list",
    "site-visits.customer",
    "ledger.users",
    "ledger.blacklist"
 ]
];

// var_dump($data['claims']);

$res = stringToAssociativeArray($data['claims']);

var_dump($res);
