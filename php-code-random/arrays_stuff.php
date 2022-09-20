<?php

/**
 * Array stuff
 */

 function stringToAssociativeArray(array $data) {

 }

 $data = ["claims" => [
    "site-visits.purpose",
    "site-visits.list",
    "site-visits.customer",
    "ledger.users",
    "ledger.blacklist"
 ]
];

var_dump($data['claims']);