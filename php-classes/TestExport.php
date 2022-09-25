<?php

include 'Export.php';

class TestExport {

    /** @var Export */
    protected $export;

    /** @var array returned array*/
    public $data = [];

    public $str = "test";

    public function __construct() {
        $this->export = new Export();
    }

    public function load(array $array) {
        $filtered = array_filter($array, function ($v){
            return !($v & 1);
        });

        $this->data = $filtered;
    }

    public function export(): array {
        return $this->export->objectToArray($this);
    }
}

$array = [0,1,2,3,4,5,6,7,8,9];
$test = new TestExport();
$test->load($array);
$tExport = $test->export();

var_dump($tExport);